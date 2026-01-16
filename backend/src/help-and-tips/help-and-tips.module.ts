import { Module } from '@nestjs/common';
import { HelpAndTipsController } from './help-and-tips.controller';
import { HelpAndTipsService } from './help-and-tips.service';

@Module({
  controllers: [HelpAndTipsController],
  providers: [HelpAndTipsService],
})
export class HelpAndTipsModule {}