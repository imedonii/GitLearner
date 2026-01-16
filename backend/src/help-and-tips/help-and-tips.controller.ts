// help-and-tips.controller.ts
import { Controller, Get } from '@nestjs/common';
import { HelpAndTipsService } from './help-and-tips.service';

@Controller('help-and-tips')
export class HelpAndTipsController {
  constructor(private readonly helpAndTipsService: HelpAndTipsService) {}

  @Get('categories')
  getCategories() {
    return this.helpAndTipsService.getCategories();
  }

  @Get('commands')
  getCommands() {
    return this.helpAndTipsService.getCommands();
  }

  @Get('tips')
  getTips() {
    return this.helpAndTipsService.getTips();
  }

  @Get('commands/common')
  getCommonCommands() {
    return this.helpAndTipsService.getCommonCommands();
  }
}