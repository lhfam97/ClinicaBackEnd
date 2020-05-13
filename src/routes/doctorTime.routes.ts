import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateDoctorTimeService from '../services/CreateDoctorTimeService';

import DoctorTime from '../models/DoctorTime';

// import Doctor from '../models/Doctor';

const doctorTimeRouter = Router();

doctorTimeRouter.get('/', async (request, response) => {
  const doctorTimeRepository = getRepository(DoctorTime);

  const doctorTime = await doctorTimeRepository.find();
  response.json(doctorTime);
});

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
