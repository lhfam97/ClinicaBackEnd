import { getRepository } from 'typeorm';

import moment from 'moment';
import Time from '../models/Time';

interface Request {
  date: string;
}

class CreatePatientService {
  public async Execute({ date }: Request): Promise<Time[]> {
    const timeRepository = getRepository(Time);

    const moment_date = moment(date, 'DD/MM/YYYY');
    const moment_now = moment_date.clone();
    const new_Times: Time[] = [];
    moment_now.add(8, 'h');
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 12; j++) {
        const date_inicial = new Date(moment_now.toString());
        const new_time = timeRepository.create({
          date: date_inicial,
        });
        new_Times.push(new_time);
        moment_now.add(1, 'h');
      }

      moment_now.add(12, 'h');
    }

    for (let index = 0; index < new_Times.length; index++) {
      // eslint-disable-next-line no-await-in-loop
      await timeRepository.save(new_Times[index]);
    }

    return new_Times;
  }
}

export default CreatePatientService;
