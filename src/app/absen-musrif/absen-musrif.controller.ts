import {
  Controller,
  Post,
  Body,
  Get,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AbsenMusrifService } from './absen-musrif.service';
import { AbsensiMusrif } from './absen-musrif.entity';
import { JwtGuard } from '../auth/auth.guard';

@UseGuards(JwtGuard)
@Controller('absensi-musrif')
export class AbsenMusrifController {
  constructor(private readonly absenMusrifService: AbsenMusrifService) {}

  @Post('absen')
  async markAttendance(
    @Body('nama') nama: string,
    @Body('hadir') hadir: boolean,
    @Body('shift') shift: string,
    @Body('action') action: string,
  ): Promise<AbsensiMusrif> {
    try {
      return await this.absenMusrifService.markAttendance(
        nama,
        hadir,
        shift,
        action,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('today')
  async getTodayAttendance(): Promise<any> {
    const attendance = await this.absenMusrifService.getTodayAttendance();

    return {
      message: 'Musrif halaqoh sudah absen',
      data: attendance,
    };
  }
}
