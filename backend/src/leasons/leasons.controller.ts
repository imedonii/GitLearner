// leasons.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { LeasonsService } from './leasons.service';
import { CreateLeasonDto } from './dto/create-leason.dto';
import { UpdateLeasonDto } from './dto/update-leason.dto';

@Controller('leasons')
export class LeasonsController {
  constructor(private readonly leasonsService: LeasonsService) {}

  @Post()
  create(@Body() dto: CreateLeasonDto) {
    return this.leasonsService.create(dto);
  }

  @Get()
  findAll() {
    return this.leasonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leasonsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLeasonDto) {
    return this.leasonsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leasonsService.remove(id);
  }
}
