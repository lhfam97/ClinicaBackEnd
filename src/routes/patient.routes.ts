import { Router } from 'express';
import { getRepository } from 'typeorm';
import Patient from '../models/Patient';
import AppError from '../errors/AppError';
import CreatePatientService from '../services/CreatePatientService';

const patientRouter = Router();

patientRouter.get('/', async (request, response) => {
  const patientRepository = getRepository(Patient);
  const patients = await patientRepository.find();
  response.json(patients);
});

patientRouter.post('/', async (request, response) => {
  const {
    name,
    birth_date,
    phone,
    rg,
    cpf,
    street,
    neighborhood,
    number,
  } = request.body;
  const createPatientService = new CreatePatientService();

  const patient = await createPatientService.Execute({
    name,
    birth_date,
    phone,
    rg,
    cpf,
    street,
    neighborhood,
    number,
  });

  return response.json(patient);
});

patientRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const doctorRepository = getRepository(Patient);
  const findDoctor = await doctorRepository.findOne({
    where: { id },
  });
  if (findDoctor) {
    await doctorRepository.remove(findDoctor);
  } else {
    throw new AppError('Patient do not exist');
  }
  return response.status(204).send();
});

export default patientRouter;
