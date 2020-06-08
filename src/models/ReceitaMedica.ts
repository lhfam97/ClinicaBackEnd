import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Consulta from './Consulta'

@Entity('receitas_medicas')
class ReceitaMedica {
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @Column()
  consulta_id: string;

  @ManyToOne(() => Consulta)
  @JoinColumn({ name: 'consulta_id' })
  consulta: Consulta;

  @Column()
  descricao: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ReceitaMedica;
