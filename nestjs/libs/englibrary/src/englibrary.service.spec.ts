import { HttpException, HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EnglibraryService } from './englibrary.service';

describe('EnglibraryService', () => {
  const PASS_USERNAME = '6031301721';
  let service: EnglibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnglibraryService],
      imports:   [HttpModule],
    }).compile();

    service = module.get<EnglibraryService>(EnglibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('find success', async () => {
    const u = await service.get(PASS_USERNAME).toPromise();
    expect(u).toBeTruthy();
  });
  // prettier-ignore
  it('find fail', async () => {
    await expect(service.get('*')      .toPromise()).rejects.toThrowError(HttpException);
    await expect(service.get(undefined).toPromise()).rejects.toThrowError(HttpException);
  });
});
