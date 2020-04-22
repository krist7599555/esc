import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { expect, use } from 'chai';
import { UsersModule } from '../users/users.module';
import * as ChaiSubset from'chai-subset';
use(ChaiSubset);

describe('auth.service', () => {
  let controller: AuthController;
  const username = '6031301721';
  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [AuthController],
      providers:   [AuthService],
      imports:     [UsersModule],
    }).compile();
    controller = await mod.resolve(AuthController);
  });
  it('normal', function normal_flow() {
    return expect(controller.login({ username, password: 'krist7599555' })).to.eventually.fulfilled
      .keys('profile', 'access_token')
      .containSubset({
        profile: {
          id: username,
        },
      });
  });
  it('bad password', function normal_flow() {
    return expect(controller.login({ username: '6031301721', password: 'ascascasc' })).to.eventually.rejected;
  });
});