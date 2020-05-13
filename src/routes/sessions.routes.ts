import { Router } from 'express';

import AuthenticateDoctorService from '../services/AuthenticateDoctorService';
import AuthenticatePatientService from '../services/AuthenticatePatientService';

const sessionsRouter = Router();

// Post http://localhost:3333/appointments

// DTO = Data transfer object
// SOC Sepparation of Concerns. Separação de preocupações
// Rota: Receber requisição, chamar outro arquivo, devolver uma resposta

sessionsRouter.post('/patient', async (request, response) => {
  const { cpf, password } = request.body;
  const authenticatePatient = new AuthenticatePatientService();

  const { patient, token } = await authenticatePatient.execute({ cpf, password });

  delete patient.password;

  return response.send({ patient, token });

  // return response.status(err.statusCode).json({ error: err.message });
});

sessionsRouter.post('/doctor', async (request, response) => {
  const { crm, password } = request.body;
  const authenticateDoctor = new AuthenticateDoctorService();

  const { doctor, token } = await authenticateDoctor.execute({ crm, password });

  delete doctor.password;

  return response.send({ doctor, token });

  // return response.status(err.statusCode).json({ error: err.message });
});


export default sessionsRouter;
