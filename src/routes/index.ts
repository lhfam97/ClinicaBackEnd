import { Router } from 'express';
import expertiseRouter from './expertise.routes';

const routes = Router();
routes.use('/expertises', expertiseRouter);

export default routes;
