import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

import Patient from '../models/Patient';

interface Request {
  cpf: string;

  password: string;
}
interface Response {
  patient: Patient;
  token: string;
}

class AuthenticatePatientService {
  public async execute({ cpf, password }: Request): Promise<Response> {
    const patientsRepository = getRepository(Patient);
    const patient = await patientsRepository.findOne({
      where: { cpf },
    });
    if (!patient) {
      throw new AppError('Incorrect cpf/password combination.', 401);
    }
    // user.password - senha criptografada
    // password - Senha não criptografada

    const passwordMatched = await compare(password, patient.password);
    if (!passwordMatched) {
      throw new AppError('Incorrect cpf/password combination.', 401);
    }
    // Usuario autenticado
    // experiencia / seguranca
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: patient.id,
      expiresIn,
    });

    return { patient, token };
  }
}
export default AuthenticatePatientService;
