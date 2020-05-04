import { Router } from 'express';
import { getRepository } from 'typeorm';
import Expertise from '../models/Expertise';
import AppError from '../errors/AppError';

const expertiseRouter = Router();

expertiseRouter.get('/', async (request, response) => {
  const expertiseRepository = getRepository(Expertise);
  const expertises = await expertiseRepository.find();
  response.json(expertises);
});

expertiseRouter.post('/', async (request, response) => {
  const { name } = request.body;
  const expertiseRepository = getRepository(Expertise);
  const checkExpertiseExists = await expertiseRepository.findOne({
    where: { name },
  });
  if (checkExpertiseExists) {
    throw new AppError('Name already used');
  } else {
    const expertise = expertiseRepository.create({
      name,
    });
    await expertiseRepository.save(expertise);
    return response.json(expertise);
  }
});

expertiseRouter.delete('/:id?', async (request, response) => {
  const { id } = request.params;
  const expertiseRepository = getRepository(Expertise);

  const findExpertise = await expertiseRepository.findOne({
    where: { id },
  });
  if (findExpertise) {
    await expertiseRepository.remove(findExpertise);
  } else {
    throw new AppError('Expertise do not exist');
  }
  return response.status(204).send();
});

export default expertiseRouter;
