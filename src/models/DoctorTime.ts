import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Doctor from './Doctor';
import Time from './Time';

@Entity('doctor_times')
class DoctorTime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  doctor_id: string;

  @Column()
  time_id: string;

  @Column()
  available: boolean;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Time)
  @JoinColumn({ name: 'time_id' })
  time: Time;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default DoctorTime;
