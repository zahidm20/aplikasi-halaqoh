/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { SantriHalaqoh } from './santri.entity';
import { CreateSantriHalaqohDto, findAllSantriHalaqohDto } from './santri.dto';
import BaseResponse from 'src/utils/response/base.response';
import { REQUEST } from '@nestjs/core';
import { ResponsePagination, ResponseSuccess } from 'src/interface/response';

@Injectable()
export class SantriHalaqohService extends BaseResponse {
  constructor(
    @InjectRepository(SantriHalaqoh)
    private readonly santriHalaqohRepository: Repository<SantriHalaqoh>,
    @Inject(REQUEST) private req: any,
  ) {
    super();
  }

  // Fungsi create
  async create(payload: CreateSantriHalaqohDto): Promise<ResponseSuccess> {
    try {
      await this.santriHalaqohRepository.save({
        ...payload,
        pengampuh: {
          id: this.req.user.id,
        },
        created_by: {
          id: this.req.user.id,
        },
      });

      console.log(payload);

      return this._success('BERHASIL', payload);
    } catch (error) {
      throw new HttpException('Ada Kesalahan', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getAllSantri(
    query: findAllSantriHalaqohDto,
  ): Promise<ResponsePagination> {
    const { page, pageSize, limit, nama_santri } = query;

    const filterQuery: any = {
      created_by: {
        id: this.req.user.id,
      },
    };

    if (nama_santri) {
      filterQuery.nama_santri = Like(`%${nama_santri}%`);
    }
    const total = await this.santriHalaqohRepository.count({
      where: filterQuery,
    });

    const result = await this.santriHalaqohRepository.find({
      where: filterQuery,
      relations: ['pengampuh', 'created_by', 'updated_by'],
      select: {
        id: true,
        nama_santri: true,
        pengampuh: {
          id: true,
          nama: true,
        },
        created_by: {
          id: true,
          nama: true,
        },
        updated_by: {
          id: true,
          nama: true,
        },
      },
      skip: limit,
      take: pageSize,
    });

    return this._pagination('OK', result, total, page, pageSize);
  }

  // Fungsi update santri
  async updateSantri(
    id: number,
    payload: Partial<CreateSantriHalaqohDto>,
  ): Promise<ResponseSuccess> {
    try {
      // Cek apakah data santri dengan ID yang diberikan ada
      const santri = await this.santriHalaqohRepository.findOne({
        where: { id, created_by: { id: this.req.user.id } },
      });

      if (!santri) {
        throw new HttpException('Santri tidak ditemukan', HttpStatus.NOT_FOUND);
      }

      // Update data santri
      await this.santriHalaqohRepository.update(id, {
        ...payload,
        updated_by: {
          id: this.req.user.id,
        },
      });

      const updatedSantri = await this.santriHalaqohRepository.findOne({
        where: { id },
        relations: ['pengampuh', 'created_by', 'updated_by'],
        select: {
          id: true,
          nama_santri: true,
          pengampuh: {
            id: true,
            nama: true,
          },
          created_by: {
            id: true,
            nama: true,
          },
          updated_by: {
            id: true,
            nama: true,
          },
        },
      });

      return this._success('BERHASIL UPDATE', updatedSantri);
    } catch (error) {
      throw new HttpException(
        'Ada Kesalahan saat mengupdate data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async deleteSantri(id: number): Promise<ResponseSuccess> {
    try {
      // Cek apakah data santri dengan ID yang diberikan ada
      const santri = await this.santriHalaqohRepository.findOne({
        where: { id, created_by: { id: this.req.user.id } },
      });

      if (!santri) {
        throw new HttpException('Santri tidak ditemukan', HttpStatus.NOT_FOUND);
      }

      // Hapus data santri
      await this.santriHalaqohRepository.delete(id);

      return this._success('BERHASIL DIHAPUS', { id });
    } catch (error) {
      throw new HttpException(
        'Ada Kesalahan saat menghapus data',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
