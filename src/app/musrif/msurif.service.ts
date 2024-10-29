import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musrif } from './musrif.entity';
import { CreateMusrifDto, UpdateMusrifDto } from './musrif.dto';

@Injectable()
export class MusrifService {
  constructor(
    @InjectRepository(Musrif)
    private musrifRepository: Repository<Musrif>,
  ) {}

  async findAll(): Promise<Musrif[]> {
    return await this.musrifRepository.find();
  }

  async findOne(id: number): Promise<Musrif> {
    const musrif = await this.musrifRepository.findOne({ where: { id } });
    if (!musrif) {
      throw new NotFoundException(`Musrif with ID ${id} not found`);
    }
    return musrif;
  }

  async create(createMusrifDto: CreateMusrifDto): Promise<Musrif> {
    const musrif = this.musrifRepository.create(createMusrifDto);
    return await this.musrifRepository.save(musrif);
  }

  async update(id: number, updateMusrifDto: UpdateMusrifDto): Promise<Musrif> {
    const musrif = await this.findOne(id);
    Object.assign(musrif, updateMusrifDto);
    return await this.musrifRepository.save(musrif);
  }

  async remove(id: number): Promise<void> {
    const musrif = await this.findOne(id);
    await this.musrifRepository.remove(musrif);
  }
}
