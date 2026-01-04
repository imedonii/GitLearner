// leasons.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeasonDto } from './dto/create-leason.dto';
import { UpdateLeasonDto } from './dto/update-leason.dto';

@Injectable()
export class LeasonsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateLeasonDto) {
    return this.prisma.leasons.create({ data: dto });
  }

  findAll() {
    return this.prisma.leasons.findMany();
  }

  findOne(id: string) {
    return this.prisma.leasons.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateLeasonDto) {
    return this.prisma.leasons.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.leasons.delete({ where: { id } });
  }
}
