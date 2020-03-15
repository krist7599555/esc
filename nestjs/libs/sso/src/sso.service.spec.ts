import { Test, TestingModule } from '@nestjs/testing';
import { SsoService } from './sso.service';
import { HttpModule, HttpException } from '@nestjs/common';

describe('SsoService', () => {
  let service: SsoService;
  const PASS_USERNAME = '6031301721';
  const PASS_PASSWORD = 'krist7599555';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SsoService],
      imports:   [HttpModule],
    }).compile();

    service = module.get<SsoService>(SsoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('normal flow', async () => {
    const user = await service.login(PASS_USERNAME, PASS_PASSWORD).toPromise();
    expect(user).toBeTruthy();
  });

  function login_fail(usr, pwd) {
    return expect(service.login(usr, pwd)).rejects.toThrowError(HttpException);
  }
  it('wrong username', async () => {
    await login_fail('*', PASS_PASSWORD);
  });
  it('wrong password', async () => {
    await login_fail(PASS_USERNAME, '*');
  });
  it('no username', async () => {
    await login_fail(undefined, '*');
    await login_fail(null, '*');
  });
});
