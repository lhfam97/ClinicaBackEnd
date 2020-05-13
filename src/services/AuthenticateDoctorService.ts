import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

import Doctor from '../models/Doctor';

interface Request {
  crm: string;

  password: string;
}
interface Response {
  doctor: Doctor;
  token: string;
}

class AuthenticateDoctorService {
  public async execute({ crm, password }: Request): Promise<Response> {
    const doctorsRepository = getRepository(Doctor);
    const doctor = await doctorsRepository.findOne({
      where: { crm },
    });
    if (!doctor) {
      throw new AppError('Incorrect crm/password combination.', 401);
    }
    // user.password - senha criptografada
    // password - Senha não criptografada

    const passwordMatched = await compare(password, doctor.password);
    if (!passwordMatched) {
      throw new AppError('Incorrect crm/password combination.', 401);
    }
    // Usuario autenticado
    // experiencia / seguranca
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: doctor.id,
      expiresIn,
    });

    return { doctor, token };
  }
}
export default AuthenticateDoctorService;
