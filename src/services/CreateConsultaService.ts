import { getRepository } from 'typeorm';
import Consulta from '../models/Consulta';
import DoctorTime from '../models/DoctorTime';
import AppError from '../errors/AppError';

interface Request {
  doctor_time_id: string;

  patient_id: string;

  cobertura_id: string;
}

class CreateConsultaService {
  public async Execute({
    doctor_time_id,
    patient_id,
    cobertura_id,
  }: Request): Promise<Consulta> {
    const consultaRepository = getRepository(Consulta);
    const doctorTimeRepository = getRepository(DoctorTime);

    const checkDoctorTimeExists = await doctorTimeRepository.findOne({
      where: { id: doctor_time_id },
    });

    if (!checkDoctorTimeExists) {
      throw new AppError('DoctorTime do not exist');
    }
    if (checkDoctorTimeExists.available === false) {
      throw new AppError('This time was already booked');
    }
    const consulta = consultaRepository.create({
      doctor_time_id,
      patient_id,
      cobertura_id,
    });

    checkDoctorTimeExists.available = false;
    await consultaRepository.save(consulta);
    await doctorTimeRepository.save(checkDoctorTimeExists);
    return consulta;
  }
}

export default CreateConsultaService;
