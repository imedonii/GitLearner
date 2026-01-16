import { Module } from '@nestjs/common';
import { UserLessonProgressController } from './user-lesson-progress.controller';
import { UserLessonProgressService } from './user-lesson-progress.service';

@Module({
  controllers: [UserLessonProgressController],
  providers: [UserLessonProgressService],
})
export class UserLessonProgressModule {}
