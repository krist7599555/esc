import { Test, TestingModule } from '@nestjs/testing';
import { RethinkdbRepositoryService } from './rethinkdb-repository.service';

describe('RethinkdbRepositoryService', () => {
  let service: RethinkdbRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RethinkdbRepositoryService],
    }).compile();

    service = module.get<RethinkdbRepositoryService>(RethinkdbRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
