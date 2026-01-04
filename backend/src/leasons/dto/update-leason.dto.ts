import { PartialType } from '@nestjs/mapped-types';
import { CreateLeasonDto } from './create-leason.dto';

export class UpdateLeasonDto extends PartialType(CreateLeasonDto) {}
