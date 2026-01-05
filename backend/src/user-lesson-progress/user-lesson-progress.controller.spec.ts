import { Test, TestingModule } from '@nestjs/testing';
import { UserLessonProgressController } from './user-lesson-progress.controller';

describe('UserLessonProgressController', () => {
  let controller: UserLessonProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserLessonProgressController],
    }).compile();

    controller = module.get<UserLessonProgressController>(UserLessonProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
