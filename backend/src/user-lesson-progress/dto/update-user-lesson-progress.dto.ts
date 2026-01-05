import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserLessonProgressDto {
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @IsOptional()
  @IsString()
  levelId?: string;
}
