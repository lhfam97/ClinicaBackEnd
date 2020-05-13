import { Router } from 'express';
import expertiseRouter from './expertise.routes';
import doctorRouter from './doctor.routes';
import patientRouter from './patient.routes';
import coberturaRouter from './cobertura.routes';
import timesRouter from './time.routes';
import doctorTimeRouter from './doctorTime.routes';
import consultaRouter from './consulta.routes';

const routes = Router();
routes.use('/expertises', expertiseRouter);
routes.use('/doctors', doctorRouter);
routes.use('/patients', patientRouter);
routes.use('/coberturas', coberturaRouter);
routes.use('/times', timesRouter);
routes.use('/doctorTime', doctorTimeRouter);
routes.use('/consulta', consultaRouter);

export default routes;
