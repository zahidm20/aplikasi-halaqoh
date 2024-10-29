import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musrif } from './musrif.entity';
import { MusrifService } from './msurif.service';
import { MusrifController } from './musrifi.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Musrif])],
  providers: [MusrifService],
  controllers: [MusrifController],
})
export class MusrifModule {}
