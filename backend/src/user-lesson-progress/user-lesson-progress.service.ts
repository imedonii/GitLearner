import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserLessonProgressDto } from './dto/create-user-lesson-progress.dto';
import { UpdateUserLessonProgressDto } from './dto/update-user-lesson-progress.dto';

@Injectable()
export class UserLessonProgressService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new progress record
   */
  async create(dto: CreateUserLessonProgressDto) {
    return this.prisma.userLeasonProgress.create({
      data: {
        userId: dto.userId,
        leasonId: dto.lessonId,
        levelId: dto.levelId,
        isCompleted: dto.isCompleted ?? false,
        completedAt: dto.isCompleted ? new Date() : undefined,
      },
    });
  }

  /**
   * Get all progress for a specific user
   */
  async findByUser(userId: string) {
    return this.prisma.userLeasonProgress.findMany({
      where: { userId },
      include: { leason: true, level: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  /**
   * Get the last completed lesson for a user
   */
  async findLastCompleted(userId: string) {
    const last = await this.prisma.userLeasonProgress.findFirst({
      where: {
        userId,
        isCompleted: true,
      },
      include: { leason: true, level: true },
      orderBy: { completedAt: 'desc' },
    });

    if (!last) {
      throw new NotFoundException('No completed lessons found for this user');
    }

    return last;
  }

  /**
   * Update progress record
   */
  async update(id: string, dto: UpdateUserLessonProgressDto) {
    const exists = await this.prisma.userLeasonProgress.findUnique({
      where: { id },
    });
    if (!exists) {
      throw new NotFoundException('Progress record not found');
    }

    return this.prisma.userLeasonProgress.update({
      where: { id },
      data: {
        isCompleted: dto.completed ?? exists.isCompleted,
        completedAt: dto.completed ? new Date() : undefined,
        levelId: dto.levelId ?? exists.levelId,
      },
    });
  }

  /**
   * Mark a lesson as completed by lesson ID (creates or updates progress record)
   */
  async markLessonComplete(userId: string, lessonId: string, levelId: string) {
    return this.prisma.userLeasonProgress.upsert({
      where: {
        userId_leasonId: {
          userId,
          leasonId: lessonId,
        },
      },
      update: {
        isCompleted: true,
        completedAt: new Date(),
        levelId,
      },
      create: {
        userId,
        leasonId: lessonId,
        levelId,
        isCompleted: true,
        completedAt: new Date(),
      },
    });
  }
}
