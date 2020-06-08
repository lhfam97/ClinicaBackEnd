import { Router } from 'express';
import { getRepository } from 'typeorm';
import ReceitaMedica from '../models/ReceitaMedica';
import AppError from '../errors/AppError';

const receitaMedicaRouter = Router();

receitaMedicaRouter.get('/', async (request, response) => {
  const receitasMedicasRepository = getRepository(ReceitaMedica);

  const receitasMedicas = await receitasMedicasRepository.find();
  response.json(receitasMedicas);
});


receitaMedicaRouter.post('/', async (request, response) => {
  const { descricao, consulta_id } = request.body;
  const receitasMedicasRepository = getRepository(ReceitaMedica);


  const receitaMedica = receitasMedicasRepository.create({
    descricao,
    consulta_id
  });
  await receitasMedicasRepository.save(receitaMedica);
  return response.json(receitaMedica);
});

receitaMedicaRouter.delete('/:id?', async (request, response) => {
  const { id } = request.params;
  const receitasMedicasRepository = getRepository(ReceitaMedica);

  const findReceita = await receitasMedicasRepository.findOne({
    where: { id },
  });
  if (findReceita) {
    await receitasMedicasRepository.remove(findReceita);
  } else {
    throw new AppError('Receita do not exist');
  }
  return response.status(204).send();
});

export default receitaMedicaRouter;
