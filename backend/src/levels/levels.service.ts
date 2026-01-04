import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';

@Injectable()
export class LevelsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateLevelDto) {
    return this.prisma.level.create({ data: dto });
  }

  findAll() {
    return this.prisma.level.findMany();
  }

  findOne(id: string) {
    return this.prisma.level.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateLevelDto) {
    return this.prisma.level.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.level.delete({ where: { id } });
  }
}
