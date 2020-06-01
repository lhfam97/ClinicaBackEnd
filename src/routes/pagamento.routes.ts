import { Router } from 'express';
import { getRepository } from 'typeorm';
import Pagamento from '../models/Pagamento';
import AppError from '../errors/AppError';
import CreatePagamentoService from '../services/CreatePagamentoService';

const pagamentoRouter = Router();

pagamentoRouter.get('/', async (request, response) => {
  const pagamentosRepository = getRepository(Pagamento);

  const pagamentos = await pagamentosRepository.find();
  response.json(pagamentos);
});

pagamentoRouter.post('/', async (request, response) => {
  const {
    consulta_id,
    valor,
    tipo_pagamento_id,
    data_pagamento,
  } = request.body;

  const createPagamentoService = new CreatePagamentoService();

  const pagamento = await createPagamentoService.Execute({
    consulta_id,
    valor,
    tipo_pagamento_id,
    data_pagamento,
  });
  return response.json(pagamento);
});

pagamentoRouter.delete('/:id?', async (request, response) => {
  const { id } = request.params;

  const pagamentosRepository = getRepository(Pagamento);

  const findPagamento = await pagamentosRepository.findOne({
    where: { id },
  });
  if (findPagamento) {
    await pagamentosRepository.remove(findPagamento);
  } else {
    throw new AppError('Pagamento do not exist');
  }
  return response.status(204).send();
});

export default pagamentoRouter;
