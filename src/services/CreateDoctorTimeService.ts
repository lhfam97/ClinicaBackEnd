import { getRepository, Between } from 'typeorm';

import Time from '../models/Time';
import DoctorTime from '../models/DoctorTime';
import Doctor from '../models/Doctor';
import AppError from '../errors/AppError';

interface Request {
  id: string;

  date_inicial: string;

  date_final: string;
}

class CreatePatientService {
  public async Execute({
    id,
    date_inicial,
    date_final,
  }: Request): Promise<DoctorTime[] | void> {
    const new_doctors_time: DoctorTime[] = [];
    const doctorRepository = getRepository(Doctor);
    const doctorTimeRepository = getRepository(DoctorTime);
    try {
      const checkDoctorExists = await doctorRepository.findOne({
        where: { id },
      });

      if (!checkDoctorExists) {
        throw new AppError('Doctor do not exist');
      }
      const timeRepository = getRepository(Time);
      const data_inicial = new Date(date_inicial);
      const data_final = new Date(date_final);

      const times: Time[] = await timeRepository.find({
        where: {
          date: Between(data_inicial, data_final),
        },
      });

      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < times.length; index++) {
        // eslint-disable-next-line no-await-in-loop
        const checkDoctorTimeExists = await doctorTimeRepository.findOne({
          where: { doctor_id: id, time_id: times[index].id },
        });
        if (!checkDoctorTimeExists) {
          const new_doctor_time = doctorTimeRepository.create({
            doctor_id: id,
            time_id: times[index].id,
            available: true,
          });

          new_doctors_time.push(new_doctor_time);
          // eslint-disable-next-line no-await-in-loop
          await doctorTimeRepository.save(new_doctor_time);
        }
      }
      return new_doctors_time;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw new AppError('Doctor do not exist');
    }
  }
}

export default CreatePatientService;
