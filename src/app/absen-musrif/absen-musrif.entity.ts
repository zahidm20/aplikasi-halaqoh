import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AbsensiMusrif {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @Column()
  hadir: boolean;

  @Column()
  shift: string;

  @Column({ type: 'datetime', nullable: true }) // Ensure this is nullable
  tanggal_masuk: Date;

  @Column({ type: 'datetime', nullable: true }) // Ensure this is nullable
  tanggal_keluar: Date;
}
