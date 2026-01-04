import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLevelDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;
}
