// help-and-tips.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HelpAndTipsService {
  constructor(private prisma: PrismaService) {}

  async getCategories() {
    return this.prisma.gitCommandCategory.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getCommands() {
    return this.prisma.gitCommand.findMany({
      include: {
        category: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async getTips() {
    return this.prisma.tip.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  async getCommonCommands() {
    return this.prisma.gitCommand.findMany({
      where: { isCommon: true },
      include: {
        category: true,
      },
      orderBy: { name: 'asc' },
    });
  }
}
