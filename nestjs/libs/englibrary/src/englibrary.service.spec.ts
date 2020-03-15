import { Test, TestingModule } from '@nestjs/testing';
import { EnglibraryService } from './englibrary.service';

describe('EnglibraryService', () => {
  let service: EnglibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnglibraryService],
    }).compile();

    service = module.get<EnglibraryService>(EnglibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
