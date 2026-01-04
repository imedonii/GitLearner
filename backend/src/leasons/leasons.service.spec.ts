import { Test, TestingModule } from '@nestjs/testing';
import { LeasonsService } from './leasons.service';

describe('LeasonsService', () => {
  let service: LeasonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeasonsService],
    }).compile();

    service = module.get<LeasonsService>(LeasonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
