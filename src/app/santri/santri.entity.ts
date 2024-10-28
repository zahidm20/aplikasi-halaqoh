import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { User } from '../auth/auth.entity';

@Entity()
export class SantriHalaqoh extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nama_santri: string;

  @Column({ nullable: false })
  kelas: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'pengampuh' })
  pengampuh: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;
}
