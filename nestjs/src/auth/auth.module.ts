import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { BcryptService } from './bcrypt.service';

import { Module } from '@nestjs/common';
import { SsoModule } from '../../libs/sso/src/sso.module';
import { UsersModule } from '../users/users.module';
import { EnglibraryModule } from '../../libs/englibrary/src/englibrary.module';

@Module({
  imports:     [SsoModule, EnglibraryModule, UsersModule],
  providers:   [AuthController, AuthGuard, BcryptService],
  exports:     [AuthController, AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {

}