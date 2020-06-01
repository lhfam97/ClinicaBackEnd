import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import TipoPagamento from './TipoPagamento';
import Consulta from './Consulta';

@Entity('pagamentos')
class Pagamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  consulta_id: string;

  @Column()
  tipo_pagamento_id: string;

  @Column('decimal', { precision: 5, scale: 2 })
  valor: number;

  @Column()
  data_pagamento: Date;

  @ManyToOne(() => TipoPagamento)
  @JoinColumn({ name: 'tipo_pagamento_id' })
  tipo_pagamento: TipoPagamento;

  @ManyToOne(() => Consulta)
  @JoinColumn({ name: 'consulta_id' })
  consulta: Consulta;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Pagamento;
