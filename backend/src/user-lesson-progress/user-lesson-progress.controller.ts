import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserLessonProgressService } from './user-lesson-progress.service';
import { CreateUserLessonProgressDto } from './dto/create-user-lesson-progress.dto';
import { UpdateUserLessonProgressDto } from './dto/update-user-lesson-progress.dto';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('user-lesson-progress')
export class UserLessonProgressController {
  constructor(
    private readonly userLessonProgressService: UserLessonProgressService,
  ) {}

  /**
   * ✅ Create progress (usually when lesson is first opened or completed)
   * userId should come from JWT, not body
   */
  @Post()
  create(@Req() req: Request, @Body() dto: CreateUserLessonProgressDto) {
    const userId = (req as any).user?.id; // from JwtStrategy
    return this.userLessonProgressService.create({
      ...dto,
      userId,
    });
  }

  /**
   * 📚 Get all lesson progress for logged-in user
   */
  @Get()
  findMyProgress(@Req() req: Request) {
    const userId = (req as any).user?.id;
    return this.userLessonProgressService.findByUser(userId);
  }

  /**
   * 🎯 Get last completed lesson for logged-in user
   */
  @Get('last-completed')
  getLastCompleted(@Req() req: Request) {
    const userId = (req as any).user?.id;
    return this.userLessonProgressService.findLastCompleted(userId);
  }

  /**
   * ✅ Mark lesson as completed
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserLessonProgressDto) {
    return this.userLessonProgressService.update(id, dto);
  }

  /**
   * ✅ Complete a lesson by lesson ID
   */
  @Post('complete/:lessonId')
  async completeLesson(@Req() req: Request, @Param('lessonId') lessonId: string, @Body() body: { levelId: string }) {
    const userId = (req as any).user?.id;
    return this.userLessonProgressService.markLessonComplete(userId, lessonId, body.levelId);
  }
}
