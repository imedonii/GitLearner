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

  async findWithProgress(userId: string, levelId?: string, userLevelSlug?: string): Promise<LessonWithProgress[]> {
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

    // Sort lessons by level order, then by order within level
    const levelOrder = ['newbie', 'beginner', 'mid', 'pro'];
    lessons.sort((a, b) => {
      const aLevelIndex = levelOrder.indexOf(a.level.slug);
      const bLevelIndex = levelOrder.indexOf(b.level.slug);

      console.log(`SORT: a=${a.title}, a.level=${a.level.slug}, a.order=${a.order}, aLevelIndex=${aLevelIndex}`);
      console.log(`SORT: b=${b.title}, b.level=${b.level.slug}, b.order=${b.order}, bLevelIndex=${bLevelIndex}`);

      if (aLevelIndex !== bLevelIndex) {
        return aLevelIndex - bLevelIndex;
      }
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      return a.id.localeCompare(b.id);
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

    console.log(`findWithProgress: userId=${userId}, userLevelSlug=${currentUserLevelSlug}`);
    console.log(`findWithProgress: total lessons count: ${lessons.length}`);

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

    console.log(`findWithProgress: progressMap has ${progressMap.size} entries`);

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

    console.log(`findWithProgress: returning ${lessonsWithLock.length} lessons`);
    lessonsWithLock.forEach(l => {
      console.log(`  ${l.order}. ${l.title} - Level: ${l.levelSlug}, Locked: ${l.locked}, Completed: ${l.completed}`);
    });

    return lessonsWithLock;
  }

  private isLessonUnlocked(
    lessonId: string,
    lessons: any[],
    progressMap: Map<string, boolean>,
    userLevelSlug: string
  ): boolean {
    const currentLesson = lessons.find((l) => l.id === lessonId);
    if (!currentLesson) {
      console.log(`isLessonUnlocked: LOCKED - lesson not found: ${lessonId}`);
      return false;
    }

    const currentLessonLevelSlug = currentLesson.level?.slug;

    // Define level order for access control
    const levelOrder = ['newbie', 'beginner', 'mid', 'pro'];
    const currentLevelIndex = levelOrder.indexOf(currentLessonLevelSlug);
    const userLevelIndex = levelOrder.indexOf(userLevelSlug);

    console.log(`isLessonUnlocked: lessonId=${lessonId.substring(0, 8)}, lessonSlug=${currentLessonLevelSlug}, userLevelSlug=${userLevelSlug}, currentLevelIndex=${currentLevelIndex}, userLevelIndex=${userLevelIndex}`);

    // Lesson is locked if it's in a level different from user's current level
    if (currentLevelIndex !== userLevelIndex) {
      console.log(`isLessonUnlocked: LOCKED - level mismatch (lesson level ${currentLessonLevelSlug} != user level ${userLevelSlug})`);
      return false;
    }

    // Get all lessons in same level and sort by order, then by id for determinism
    const levelLessons = lessons
      .filter((l) => l.level?.slug === currentLessonLevelSlug)
      .sort((a, b) => {
        if (a.order !== b.order) {
          return a.order - b.order;
        }
        return a.id.localeCompare(b.id);
      });

    const currentIndexInLevel = levelLessons.findIndex((l) => l.id === lessonId);
    console.log(`isLessonUnlocked: currentIndexInLevel=${currentIndexInLevel}, totalLessonsInLevel=${levelLessons.length}, first lesson in level: ${levelLessons[0]?.title.substring(0, 20)}`);

    // First lesson in the level is always unlocked
    if (currentIndexInLevel === 0) {
      console.log(`isLessonUnlocked: UNLOCKED - first lesson in level`);
      return true;
    }

    // Other lessons are unlocked only if previous lesson is completed
    const previousLesson = levelLessons[currentIndexInLevel - 1];
    const previousCompleted = progressMap.get(previousLesson.id) === true;
    console.log(`isLessonUnlocked: ${previousCompleted ? 'UNLOCKED' : 'LOCKED'} - previous lesson ${previousCompleted ? 'completed' : 'not completed'}`);
    return previousCompleted;
  }
}
