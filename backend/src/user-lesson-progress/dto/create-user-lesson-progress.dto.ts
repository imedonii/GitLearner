import { IsUUID, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class CreateUserLessonProgressDto {
  @IsUUID()
  userId!: string;

  @IsUUID()
  lessonId!: string;

  @IsOptional()
  @IsUUID()
  levelId!: string; // Add levelId to track which level this lesson belongs to

  // Optional: whether the lesson is already completed
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  // Optional: completion timestamp, only set if isCompleted is true
  @IsOptional()
  @IsDateString()
  completedAt?: Date;
}
