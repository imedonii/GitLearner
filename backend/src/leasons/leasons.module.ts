import { Module } from '@nestjs/common';
import { LeasonsController } from './leasons.controller';
import { LeasonsService } from './leasons.service';

@Module({
  controllers: [LeasonsController],
  providers: [LeasonsService],
})
export class LeasonsModule {}
