import { Router } from 'express';
import { getRepository } from 'typeorm';
import Cobertura from '../models/Cobertura';
import AppError from '../errors/AppError';

const coberturaRouter = Router();

coberturaRouter.get('/', async (request, response) => {
  const coberturaRepository = getRepository(Cobertura);

  const coberturas = await coberturaRepository.find();
  response.json(coberturas);
});

coberturaRouter.post('/', async (request, response) => {
  const { name } = request.body;
  const coberturaRepository = getRepository(Cobertura);
  const checkCoberturaExists = await coberturaRepository.findOne({
    where: { name },
  });
  if (checkCoberturaExists) {
    throw new AppError('Name already used');
  } else {
    const expertise = coberturaRepository.create({
      name,
    });
    await coberturaRepository.save(expertise);
    return response.json(expertise);
  }
});

coberturaRouter.delete('/:id?', async (request, response) => {
  const { id } = request.params;

  const coberturaRepository = getRepository(Cobertura);

  const findCobertura = await coberturaRepository.findOne({
    where: { id },
  });
  if (findCobertura) {
    await coberturaRepository.remove(findCobertura);
  } else {
    throw new AppError('Cobertura do not exist');
  }
  return response.status(204).send();
});

export default coberturaRouter;
