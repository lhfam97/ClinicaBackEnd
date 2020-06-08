import { Router } from 'express';
import { getRepository, createQueryBuilder } from 'typeorm';
import Consulta from '../models/Consulta';
import AppError from '../errors/AppError';
import DoctorTime from '../models/DoctorTime';
import Cobertura from '../models/Cobertura';
import Doctor from '../models/Doctor';
import Patient from '../models/Patient';
import Expertise from '../models/Expertise';
import Time from '../models/Time';
import CreateConsultaService from '../services/CreateConsultaService';

const consultaRouter = Router();

consultaRouter.get('/', async (request, response) => {
  // const consultaRepository = getRepository(Consulta);
  // const consulta = await consultaRepository.find();
  try {
    const consultas = await createQueryBuilder(Consulta)
      .leftJoinAndSelect(
        Cobertura,
        'cobertura',
        'Consulta.cobertura_id = cobertura.id',
      )
      .leftJoinAndSelect(Patient, 'patient', 'Consulta.patient_id = patient.id')
      .leftJoinAndSelect(
        DoctorTime,
        'doctor_time',
        'Consulta.doctor_time_id = doctor_time.id',
      ).leftJoinAndSelect(
        Time,
        'time',
        'doctor_time.time_id = time.id',
      )
      .leftJoinAndSelect(Doctor, 'doctor', 'doctor_time.doctor_id = doctor.id')
      .leftJoinAndSelect(
        Expertise,
        'expertise',
        'doctor.expertise_id = expertise.id',
      )
      .getRawMany();
    consultas.map(consulta => {
      delete consulta.Consulta_doctor_time_id;
      delete consulta.Consulta_patient_id;
      delete consulta.Consulta_cobertura_id;
      delete consulta.cobertura_id;
      delete consulta.cobertura_created_at;
      delete consulta.cobertura_updated_at;
      delete consulta.patient_id;
      delete consulta.patient_address_id;
      delete consulta.patient_password;
      delete consulta.patient_created_at;
      delete consulta.patient_updated_at;
      delete consulta.doctor_time_id;
      delete consulta.doctor_time_doctor_id;
      delete consulta.doctor_time_time_id;
      delete consulta.doctor_time_available;
      delete consulta.doctor_time_created_at;
      delete consulta.doctor_time_updated_at;
      delete consulta.doctor_id;
      delete consulta.doctor_expertise_id;
      delete consulta.doctor_created_at;
      delete consulta.doctor_updated_at;
      delete consulta.doctor_password;
      delete consulta.expertise_id;
      delete consulta.expertise_created_at;
      delete consulta.expertise_updated_at;
    });
    response.json(consultas);
  } catch (error) {
    console.err(error);
  }
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
