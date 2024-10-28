import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AbsenSantriService } from './absen-santri.service';
import { CreateAbsenSantriDto } from './absen-santri.dto';
import { AbsenSantri } from './absen-santri.entity';
import { JwtGuard } from '../auth/auth.guard';

@UseGuards(JwtGuard)
@Controller('absen-santri')
export class AbsenSantriController {
  constructor(private readonly absenSantriService: AbsenSantriService) {}

  @Post()
  async create(
    @Body() createAbsenSantriDto: CreateAbsenSantriDto,
  ): Promise<AbsenSantri> {
    return this.absenSantriService.createAbsen(createAbsenSantriDto);
  }

  @Get()
  async findAll(): Promise<AbsenSantri[]> {
    return this.absenSantriService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<AbsenSantri> {
    return this.absenSantriService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAbsenSantriDto: CreateAbsenSantriDto,
  ): Promise<AbsenSantri> {
    return this.absenSantriService.updateAbsen(id, updateAbsenSantriDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    const absen = await this.absenSantriService.findById(id);
    if (!absen) {
      throw new HttpException('Data tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    await this.absenSantriService.deleteAbsen(id);
    return { message: 'absensi santri telah di hapus' };
  }
}
