import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { SantriHalaqohService } from './santri.service';
import { JwtGuard } from '../auth/auth.guard';
import { CreateSantriHalaqohDto, findAllSantriHalaqohDto } from './santri.dto';
import { Pagination } from 'src/utils/decorator/pagination-decorator';

@UseGuards(JwtGuard)
@Controller('santri-halaqoh')
export class SantriHalaqohController {
  constructor(private readonly santriService: SantriHalaqohService) {}

  @Post('create')
  async create(@Body() payload: CreateSantriHalaqohDto) {
    return this.santriService.create(payload);
  }

  @Get('list')
  async getAllSantri(@Pagination() query: findAllSantriHalaqohDto) {
    return this.santriService.getAllSantri(query);
  }

  @Get('detail/:id')
  async getSantriDetail(@Param('id') id: number) {
    return this.santriService.getSantriDetail(id);
  }

  @Put('update/:id')
  async updateSantri(
    @Param('id') id: number,
    @Body() payload: Partial<CreateSantriHalaqohDto>,
  ) {
    return this.santriService.updateSantri(id, payload);
  }

  @Delete('delete/:id')
  async deleteSantri(@Param('id') id: number) {
    return this.santriService.deleteSantri(id);
  }
}
