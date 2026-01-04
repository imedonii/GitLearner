import { Test, TestingModule } from '@nestjs/testing';
import { LeasonsController } from './leasons.controller';

describe('LeasonsController', () => {
  let controller: LeasonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeasonsController],
    }).compile();

    controller = module.get<LeasonsController>(LeasonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
