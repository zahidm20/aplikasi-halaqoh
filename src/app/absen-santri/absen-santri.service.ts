import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbsenSantri } from './absen-santri.entity';
import { CreateAbsenSantriDto } from './absen-santri.dto';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class AbsenSantriService {
  constructor(
    @InjectRepository(AbsenSantri)
    private absenSantriRepository: Repository<AbsenSantri>,
    @Inject(REQUEST) private req: any,
  ) {}

  async createAbsen(
    createAbsenSantriDto: CreateAbsenSantriDto,
  ): Promise<AbsenSantri> {
    const absenSantri = this.absenSantriRepository.create(createAbsenSantriDto);
    return await this.absenSantriRepository.save(absenSantri);
  }

  async findAll(): Promise<AbsenSantri[]> {
    return await this.absenSantriRepository.find();
  }

  async findById(id: number): Promise<AbsenSantri> {
    return await this.absenSantriRepository.findOne({ where: { id } });
  }

  async updateAbsen(
    id: number,
    updateAbsenSantriDto: CreateAbsenSantriDto,
  ): Promise<AbsenSantri> {
    await this.absenSantriRepository.update(id, updateAbsenSantriDto);
    return this.findById(id);
  }

  async deleteAbsen(id: number): Promise<void> {
    await this.absenSantriRepository.delete(id);
  }
}
