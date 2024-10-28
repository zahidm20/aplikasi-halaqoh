import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('absen_santri')
export class AbsenSantri {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  santriId: number;

  @Column()
  dariSurat: string;

  @Column()
  sampaiSurat: string;

  @Column()
  dariAyat: number;

  @Column()
  sampaiAyat: number;

  @Column({ nullable: true })
  keterangan: string;

  @CreateDateColumn()
  createdAt: Date;
}
