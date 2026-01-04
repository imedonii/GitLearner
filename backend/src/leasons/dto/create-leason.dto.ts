import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateLeasonDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  explanation!: string;

  @IsString()
  @IsNotEmpty()
  exampleCommand!: string;

  @IsString()
  @IsNotEmpty()
  hint!: string;

  @IsString()
  @IsNotEmpty()
  objective!: string;

  @IsUUID()
  @IsNotEmpty()
  levelId!: string;
}
