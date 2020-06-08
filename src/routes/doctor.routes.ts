import { Router } from 'express';
import { getRepository } from 'typeorm';
import Doctor from '../models/Doctor';
import AppError from '../errors/AppError';
import CreateDoctorService from '../services/CreateDoctorService';

const doctorRouter = Router();

doctorRouter.get('/', async (request, response) => {
  console.log("entrou")
  const doctorRepository = getRepository(Doctor);
  const doctors = await doctorRepository.find();
  response.json(doctors);
});

doctorRouter.post('/', async (request, response) => {
  const { name, crm, expertise, password } = request.body;
  const createDoctorService = new CreateDoctorService();
  const doctor = await createDoctorService.Execute({ name, crm, expertise, password });
  return response.json(doctor);
});

doctorRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const doctorRepository = getRepository(Doctor);
  const findDoctor = await doctorRepository.findOne({
    where: { id },
  });
  if (findDoctor) {
    await doctorRepository.remove(findDoctor);
  } else {
    throw new AppError('Doctor do not exist');
  }
  return response.status(204).send();
});

export default doctorRouter;
