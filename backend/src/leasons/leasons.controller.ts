// leasons.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LeasonsService, LessonWithProgress } from './leasons.service';
import { CreateLeasonDto } from './dto/create-leason.dto';
import { UpdateLeasonDto } from './dto/update-leason.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

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

  @UseGuards(AuthGuard('jwt'))
  @Get('my-progress')
  async findMyProgress(@Req() req: Request): Promise<LessonWithProgress[]> {
    const userId = (req as any).user?.id;
    const levelId = req.query.levelId as string | undefined;

    if (!userId) {
      return [];
    }

    return await this.leasonsService.findWithProgress(userId, levelId);
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
