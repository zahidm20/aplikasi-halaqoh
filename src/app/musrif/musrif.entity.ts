import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('musrif')
export class Musrif {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;
}
