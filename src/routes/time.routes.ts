import { Router } from 'express';
import { getRepository, Between } from 'typeorm';
import CreateTimeService from '../services/CreateTimeService';
import Time from '../models/Time';

const timeRouter = Router();

timeRouter.get('/', async (request, response) => {
  const timeRepository = getRepository(Time);
  const data_teste = new Date('2020-05-23 08:00:00');
  const data_final = new Date('2020-05-23 18:00:00');
  const times = await timeRepository.find({
    where: {
      date: Between(data_teste, data_final),
    },
  });
  response.json(times);
});

timeRouter.post('/', async (request, response) => {
  const { date } = request.body;
  const createTimeService = new CreateTimeService();
  const times = await createTimeService.Execute({ date });
  return response.json(times);
});

export default timeRouter;
