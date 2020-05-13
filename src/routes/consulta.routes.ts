import { Router } from 'express';
import { getRepository, createQueryBuilder } from 'typeorm';
import Consulta from '../models/Consulta';
import AppError from '../errors/AppError';
import DoctorTime from '../models/DoctorTime';
import Cobertura from '../models/Cobertura';
import CreateConsultaService from '../services/CreateConsultaService';

const consultaRouter = Router();

consultaRouter.get('/', async (request, response) => {
  // const consultaRepository = getRepository(Consulta);
  // const consulta = await consultaRepository.find();
  try {
    const consulta = await createQueryBuilder(Consulta)
      .leftJoinAndSelect(
        Cobertura,
        'cobertura',
        'Consulta.cobertura_id = cobertura.id',
      )
      .getRawMany();
    console.log(consulta);
  } catch (error) {
    console.log(error);
  }
  response.json(consulta);
});

consultaRouter.post('/', async (request, response) => {
  const { doctor_time_id, patient_id, cobertura_id } = request.body;
  const createConsultaService = new CreateConsultaService();
  const consulta = await createConsultaService.Execute({
    doctor_time_id,
    patient_id,
    cobertura_id,
  });
  return response.json(consulta);
});

consultaRouter.delete('/:id?', async (request, response) => {
  const { id } = request.params;

  const consultaRepository = getRepository(Consulta);
  const doctorTimeRepository = getRepository(DoctorTime);
  const findConsulta = await consultaRepository.findOne({
    where: { id },
  });

  if (findConsulta) {
    await consultaRepository.remove(findConsulta);

    const checkDoctorTimeExists = await doctorTimeRepository.findOne({
      where: { id: findConsulta.doctor_time_id },
    });
    if (checkDoctorTimeExists) {
      checkDoctorTimeExists.available = true;
      await doctorTimeRepository.save(checkDoctorTimeExists);
    }
  } else {
    throw new AppError('Consulta do not exist');
  }
  return response.status(204).send();
});

export default consultaRouter;
