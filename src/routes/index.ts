import { Router } from 'express';
import expertiseRouter from './expertise.routes';
import doctorRouter from './doctor.routes';
import patientRouter from './patient.routes';

const routes = Router();
routes.use('/expertises', expertiseRouter);
routes.use('/doctors', doctorRouter);
routes.use('/patients', patientRouter);

export default routes;
