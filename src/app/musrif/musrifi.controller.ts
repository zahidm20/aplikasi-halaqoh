import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MusrifService } from './msurif.service';
import { CreateMusrifDto, UpdateMusrifDto } from './musrif.dto';

@Controller('musrif')
export class MusrifController {
  constructor(private readonly musrifService: MusrifService) {}

  @Get()
  async findAll() {
    return this.musrifService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.musrifService.findOne(id);
  }

  @Post()
  async create(@Body() createMusrifDto: CreateMusrifDto) {
    return this.musrifService.create(createMusrifDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateMusrifDto: UpdateMusrifDto,
  ) {
    return this.musrifService.update(id, updateMusrifDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.musrifService.remove(id);
  }
}
