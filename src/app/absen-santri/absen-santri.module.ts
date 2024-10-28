import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenSantri } from './absen-santri.entity';
import { AbsenSantriController } from './absen-santri.controller';
import { AbsenSantriService } from './absen-santri.service';

@Module({
  imports: [TypeOrmModule.forFeature([AbsenSantri])],
  controllers: [AbsenSantriController],
  providers: [AbsenSantriService],
})
export class AbsenSantriModule {}
