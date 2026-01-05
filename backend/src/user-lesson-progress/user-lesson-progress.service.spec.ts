import { Test, TestingModule } from '@nestjs/testing';
import { UserLessonProgressService } from './user-lesson-progress.service';

describe('UserLessonProgressService', () => {
  let service: UserLessonProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLessonProgressService],
    }).compile();

    service = module.get<UserLessonProgressService>(UserLessonProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
