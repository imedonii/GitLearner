import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  // FAQ Methods
  async getAllFAQs() {
    return this.prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async getFAQById(id: string) {
    return this.prisma.fAQ.findUnique({ where: { id } });
  }

  // Achievement Methods
  async getAllAchievements() {
    return this.prisma.achievement.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async getAchievementBySlug(slug: string) {
    return this.prisma.achievement.findUnique({ where: { slug } });
  }

  async getUserAchievements(userId: string) {
    return this.prisma.userAchievement.findMany({
      where: { userId },
    });
  }

  async unlockAchievement(userId: string, achievementId: string) {
    return this.prisma.userAchievement.upsert({
      where: {
        userId_achievementId: { userId, achievementId },
      },
      update: {},
      create: {
        userId,
        achievementId,
      },
    });
  }

  // Benefit Methods
  async getAllBenefits() {
    return this.prisma.benefit.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  // Audience Methods
  async getAllAudiences() {
    return this.prisma.audience.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  // Playground Feature Methods
  async getAllPlaygroundFeatures() {
    return this.prisma.playgroundFeature.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  // Cheat Sheet Methods
  async getAllCheatSheetSections() {
    return this.prisma.cheatSheetSection.findMany({
      where: { isActive: true },
      include: {
        commands: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });
  }

  async getCheatSheetSectionBySlug(slug: string) {
    return this.prisma.cheatSheetSection.findUnique({
      where: { slug },
      include: {
        commands: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  // Level Methods (with extended fields)
  async getAllLevelsWithStyling() {
    return this.prisma.level.findMany({
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        color: true,
        bgColor: true,
        borderColor: true,
        emoji: true,
        icon: true,
        order: true,
        isPaid: true,
      },
    });
  }
}
