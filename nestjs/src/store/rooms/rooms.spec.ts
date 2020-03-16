import { Test, TestingModule } from '@nestjs/testing';
import { RethinkConnectionProvider } from '../connection.provider';
import { RoomsService } from './rooms.service';

describe('RethinkdbRepositoryService', () => {
  let service: RoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsService, RethinkConnectionProvider],
    }).compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have all 6 rooms', async () => {
    const al = await service.all();
    expect(al).toBeTruthy();
    expect(al.length == 6);
    for (const r of al) {
      expect(r).toHaveProperty('id');
      expect(r).toHaveProperty('capacity');
      expect(r).toHaveProperty('label');
    }
  });

  it('should have/exist some room', async () => {
    const al = await service.all();
    expect(al).toBeTruthy();
    expect(await service.find(al[0].id)).toBeTruthy();
    expect(await service.find('*')).toBeFalsy();
    expect(await service.find('')).toBeFalsy();
    expect(await service.exist(al[0].id)).toEqual(true);
    expect(await service.exist('*')).toEqual(false);
  });
});
