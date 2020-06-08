import { Router } from 'express';
import { getRepository, createQueryBuilder } from 'typeorm';
import CreateDoctorTimeService from '../services/CreateDoctorTimeService';
import Doctor from '../models/Doctor';
import DoctorTime from '../models/DoctorTime';
import Time from '../models/Time';

// import Doctor from '../models/Doctor';

const doctorTimeRouter = Router();

doctorTimeRouter.get('/:id?', async (request, response) => {
  const { id } = request.params;
  if (!!id) {

    const doctorTimes = await createQueryBuilder(DoctorTime)
      .leftJoinAndSelect(Doctor, 'doctor', 'DoctorTime.doctor_id = doctor.id')
      .leftJoinAndSelect(
        Time,
        'time',
        'DoctorTime.time_id = time.id',
      ).where(`DoctorTime.doctor_id='${id}'`)
      .getRawMany();
    // doctorTimes.map(doctorTime => {
    //   // delete consulta.Consulta_doctor_time_id;
    // }


    return response.json(doctorTimes);
  }
  else {
    const doctorTimes = await createQueryBuilder(DoctorTime)
      .leftJoinAndSelect(Doctor, 'doctor', 'DoctorTime.doctor_id = doctor.id')
      .leftJoinAndSelect(
        Time,
        'time',
        'DoctorTime.time_id = time.id',
      )
      .getRawMany();
    doctorTimes.map(doctorTime => {
      // delete consulta.Consulta_doctor_time_id;

    });
    return response.json(doctorTimes);
  }
}
);



// const doctorTimeRepository = getRepository(DoctorTime);

// const doctorTime = await doctorTimeRepository.find();
// response.json(doctorTime);
// });

doctorTimeRouter.post('/', async (request, response) => {
  const { id, date_final, date_inicial } = request.body;
  const createDoctorTimeService = new CreateDoctorTimeService();
  const times = await createDoctorTimeService.Execute({
    id,
    date_final,
    date_inicial,
  });
  return response.json(times);
});

export default doctorTimeRouter;
