import { getRepository } from 'typeorm';
import moment from 'moment';
import Pagamento from '../models/Pagamento';

interface Request {
  consulta_id: string;
  valor: number;
  tipo_pagamento_id: string;
  data_pagamento: string;
}

class CreatePagamentoService {
  public async Execute({
    consulta_id,
    valor,
    tipo_pagamento_id,
    data_pagamento,
  }: Request): Promise<Pagamento> {
    const pagamentosRepository = getRepository(Pagamento);
    const moment_date = moment(data_pagamento, 'DD/MM/YYYY');
    const date = new Date(moment_date.toString());
    const pagamento = pagamentosRepository.create({
      consulta_id,
      valor,
      tipo_pagamento_id,
      data_pagamento: date,
    });

    await pagamentosRepository.save(pagamento);

    return pagamento;
  }
}

export default CreatePagamentoService;
