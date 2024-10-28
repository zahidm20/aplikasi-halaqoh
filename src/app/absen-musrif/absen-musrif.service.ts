import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { AbsensiMusrif } from './absen-musrif.entity';

@Injectable()
export class AbsenMusrifService {
  constructor(
    @InjectRepository(AbsensiMusrif)
    private absensiRepository: Repository<AbsensiMusrif>,
  ) {}

  // Mark attendance dynamically based on action
  async markAttendance(
    nama: string,
    hadir: boolean,
    shift: string,
    action: string,
  ): Promise<AbsensiMusrif> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day

    // Check if there's a record for the musrif for today (for this shift)
    const existingAttendance = await this.absensiRepository.findOne({
      where: {
        nama,
        tanggal_masuk: MoreThanOrEqual(today),
        shift,
      },
    });

    // Dynamic behavior based on action
    switch (action.toLowerCase()) {
      case 'masuk': {
        // Handle check-in (masuk)
        if (existingAttendance) {
          throw new BadRequestException('Already checked in for today');
        }

        // Create a new attendance record
        const attendance = this.absensiRepository.create({
          nama,
          hadir,
          shift,
          tanggal_masuk: new Date(), // Automatically capture check-in time
          tanggal_keluar: null, // Ensure this is null on check-in
        });

        return await this.absensiRepository.save(attendance);
      }
      case 'keluar': {
        // Handle check-out (keluar)
        if (!existingAttendance) {
          throw new BadRequestException('No check-in record found for today');
        }

        if (existingAttendance.tanggal_keluar) {
          throw new BadRequestException('Already checked out for today');
        }

        // Update the existing record with check-out time
        existingAttendance.tanggal_keluar = new Date();

        return await this.absensiRepository.save(existingAttendance);
      }
      default: {
        throw new BadRequestException(`Unknown action: ${action}`);
      }
    }
  }

  // Fetch all attendance records for today
  async getTodayAttendance(): Promise<AbsensiMusrif[]> {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    return await this.absensiRepository.find({
      where: {
        tanggal_masuk: MoreThanOrEqual(startOfDay),
        tanggal_keluar: LessThanOrEqual(endOfDay),
      },
    });
  }
}
