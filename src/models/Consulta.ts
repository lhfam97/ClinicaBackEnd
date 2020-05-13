import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import DoctorTime from './DoctorTime';
import Patient from './Patient';
import Cobertura from './Cobertura';

@Entity('consultas')
class Consulta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  doctor_time_id: string;

  @Column()
  patient_id: string;

  @Column()
  cobertura_id: string;

  @ManyToOne(() => DoctorTime)
  @JoinColumn({ name: 'doctor_time_id' })
  doctor_time: DoctorTime;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Cobertura)
  @JoinColumn({ name: 'cobertura_id' })
  cobertura: Cobertura;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Consulta;
