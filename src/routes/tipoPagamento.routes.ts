import { Router } from 'express';
import { getRepository } from 'typeorm';
import TipoPagamento from '../models/TipoPagamento';
import AppError from '../errors/AppError';

const tipoPagamentoRouter = Router();

tipoPagamentoRouter.get('/', async (request, response) => {
  const tiposPagamentoRepository = getRepository(TipoPagamento);

  const tiposPagamento = await tiposPagamentoRepository.find();
  response.json(tiposPagamento);
});

tipoPagamentoRouter.post('/', async (request, response) => {
  const { descricao } = request.body;
  const tiposPagamentoRepository = getRepository(TipoPagamento);
  const checkTipoPagamentoExists = await tiposPagamentoRepository.findOne({
    where: { descricao },
  });
  if (checkTipoPagamentoExists) {
    throw new AppError('Description already used');
  } else {
    const tipoPagamento = tiposPagamentoRepository.create({
      descricao,
    });
    await tiposPagamentoRepository.save(tipoPagamento);
    return response.json(tipoPagamento);
  }
});

tipoPagamentoRouter.delete('/:id?', async (request, response) => {
  const { id } = request.params;

  const tiposPagamentoRepository = getRepository(TipoPagamento);

  const findTipoPagamento = await tiposPagamentoRepository.findOne({
    where: { id },
  });
  if (findTipoPagamento) {
    await tiposPagamentoRepository.remove(findTipoPagamento);
  } else {
    throw new AppError('Tipo pagamento do not exist');
  }
  return response.status(204).send();
});

export default tipoPagamentoRouter;
