import { Router } from 'express';
import { getRepository } from 'typeorm';
import Exame from '../models/Exame';
import AppError from '../errors/AppError';

const exameRouter = Router();

exameRouter.get('/:id?', async (request, response) => {
  const { id } = request.params
  // console.log(id)
  if (id !== undefined) {

    const exames = await getRepository(Exame).find({
      where: { consulta_id: id }
    });
    response.json(exames);
  }
  else {
    const examesRepository = getRepository(Exame);
    const exames = await examesRepository.find();
    response.json(exames);
  }

});


exameRouter.post('/', async (request, response) => {
  const { descricao, consulta_id } = request.body;
  const examesRepository = getRepository(Exame);


  const exame = examesRepository.create({
    descricao,
    consulta_id
  });
  await examesRepository.save(exame);
  return response.json(exame);
});

exameRouter.delete('/:id?', async (request, response) => {
  const { id } = request.params;
  const examesRepository = getRepository(Exame);

  const findExame = await examesRepository.findOne({
    where: { id },
  });
  if (findExame) {
    await examesRepository.remove(findExame);
  } else {
    throw new AppError('Exame do not exist');
  }
  return response.status(204).send();
});

export default exameRouter;
