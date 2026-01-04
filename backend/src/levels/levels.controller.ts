import { Controller, Get } from '@nestjs/common';
import { LevelsService } from './levels.service';

@Controller('levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Get()
  findAll() {
    return this.levelsService.findAll();
  }
}
