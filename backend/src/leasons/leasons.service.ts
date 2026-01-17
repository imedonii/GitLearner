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
  order: number;
  completionPattern?: string;
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

  async findWithProgress(userId: string, levelId?: string): Promise<LessonWithProgress[]> {
    const whereClause: any = {};
    if (levelId) {
      whereClause.levelId = levelId;
    }

    const lessons = await this.prisma.leasons.findMany({
      where: whereClause,
      include: {
        level: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    if (!lessons || lessons.length === 0) {
      return [];
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
      userProgress.map((p) => [p.leasonId, p.isCompleted]),
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
        order: lesson.order,
        completionPattern: completionPatterns[lesson.slug] || undefined,
        createdAt: lesson.createdAt,
        updatedAt: lesson.updatedAt,
        completed: isCompleted,
        locked: !this.isLessonUnlocked(lesson.id, lessons, progressMap),
      };
    });

    return lessonsWithLock;
  }

  private isLessonUnlocked(
    lessonId: string,
    lessons: any[],
    progressMap: Map<string, boolean>
  ): boolean {
    const currentIndex = lessons.findIndex((l) => l.id === lessonId);

    if (currentIndex === 0) {
      return true;
    }

    const previousLesson = lessons[currentIndex - 1];
    return progressMap.get(previousLesson.id) === true;
  }
}
