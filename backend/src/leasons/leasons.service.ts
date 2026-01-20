// leasons.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeasonDto } from './dto/create-leason.dto';
import { UpdateLeasonDto } from './dto/update-leason.dto';

export interface LessonWithProgress {
  id: string;
  slug: string;
  title: string;
  description: string;
  explanation: string;
  exampleCommand: string;
  hint: string;
  objective: string;
  levelId: string;
  levelSlug: string;
  order: number;
  category?: string | null;
  completionPattern?: string;
  practiceTask?: string | null;
  isFoundation?: boolean;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
  locked: boolean;
}

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

  async findWithProgress(
    userId: string,
    levelId?: string,
    userLevelSlug?: string,
  ): Promise<LessonWithProgress[]> {
    const whereClause: any = {};
    if (levelId) {
      whereClause.levelId = levelId;
    }

    // Get all lessons - no level filtering
    const lessons = await this.prisma.leasons.findMany({
      where: whereClause,
      include: {
        level: true,
      },
    });

    if (!lessons || lessons.length === 0) {
      return [];
    }

    // Get user's level if not provided
    let currentUserLevelSlug = userLevelSlug;
    if (!currentUserLevelSlug) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { level: { select: { slug: true } } },
      });
      currentUserLevelSlug = user?.level?.slug || 'newbie';
    }

    const userProgress = await this.prisma.userLeasonProgress.findMany({
      where: {
        userId,
        leasonId: {
          in: lessons.map((l) => l.id),
        },
      },
    });

    const progressMap = new Map(
      userProgress.map((p) => [p.leasonId, p.isCompleted])
    );

    // Define completion patterns for each lesson slug
    const completionPatterns: Record<string, string> = {
      'help': '^git help$',
      'version': '^git (?:--version|-v)$',
      'config': 'git config --global user\\.(?:name|email) ".*"',
      'init': '^git init$',
      'status': '^git status$',
      'add': '^git add',
      'commit': '^git commit -m ".+"$',
      'log': '^git log$',
      'branch': '^git branch',
      'checkout': '^git checkout',
      'push': '^git push',
      'pull': '^git pull',
      'clone': '^git clone https?:\\/\\/[^\\s]+$',
    };

    const lessonsWithLock: LessonWithProgress[] = lessons.map((lesson) => {
      const isCompleted = progressMap.get(lesson.id) || false;

      return {
        id: lesson.id,
        slug: lesson.slug,
        title: lesson.title,
        description: lesson.description,
        explanation: lesson.explanation,
        exampleCommand: lesson.exampleCommand,
        hint: lesson.hint,
        objective: lesson.objective,
        levelId: lesson.levelId,
        levelSlug: lesson.level.slug,
        order: lesson.order,
        category: lesson.category,
        completionPattern: completionPatterns[lesson.slug] || undefined,
        practiceTask: lesson.practiceTask,
        isFoundation: lesson.isFoundation,
        createdAt: lesson.createdAt,
        updatedAt: lesson.updatedAt,
        completed: isCompleted,
        locked: !this.isLessonUnlocked(lesson.id, lessons, progressMap, currentUserLevelSlug),
      };
    });

    return lessonsWithLock;
  }

  private isLessonUnlocked(
    lessonId: string,
    lessons: any[],
    progressMap: Map<string, boolean>,
    userLevelSlug: string,
  ): boolean {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson) {
      return false;
    }

    const lessonLevelSlug = lesson.level?.slug;

    // Define level order for access control
    const levelOrder = ['newbie', 'beginner', 'mid', 'pro'];
    const lessonLevelIndex = levelOrder.indexOf(lessonLevelSlug);
    const userLevelIndex = levelOrder.indexOf(userLevelSlug);

    // LESSONS IN COMPLETED LEVELS (lower than user's current level) ARE UNLOCKED
    // Users should have access to lessons they've already completed for review
    if (lessonLevelIndex < userLevelIndex) {
      const completedLevelLessons = lessons
        .filter((l) => l.level?.slug === lessonLevelSlug)
        .sort((a, b) => {
          if (a.order !== b.order) {
            return a.order - b.order;
          }
          return a.id.localeCompare(b.id);
        });

      const allCompleted = completedLevelLessons.every((l) => progressMap.get(l.id) === true);

      if (allCompleted) {
        return true;
      }

      return progressMap.get(lessonId) === true;
    }

    // LESSONS IN USER'S CURRENT LEVEL
    const levelLessons = lessons
      .filter((l) => l.level?.slug === lessonLevelSlug)
      .sort((a, b) => {
        if (a.order !== b.order) {
          return a.order - b.order;
        }
        return a.id.localeCompare(b.id);
      });

    const currentIndexInLevel = levelLessons.findIndex(
      (l) => l.id === lessonId,
    );

    // First lesson in level is always unlocked
    if (currentIndexInLevel === 0) {
      return true;
    }

    // Other lessons are unlocked only if previous lesson is completed
    const previousLesson = levelLessons[currentIndexInLevel - 1];
    return progressMap.get(previousLesson.id) === true;
  }
}
