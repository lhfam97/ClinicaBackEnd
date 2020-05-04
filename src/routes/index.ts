import { Router } from 'express';
import expertiseRouter from './expertise.routes';
import doctorRouter from './doctor.routes';

const routes = Router();
routes.use('/expertises', expertiseRouter);
routes.use('/doctors', doctorRouter);

export default routes;
