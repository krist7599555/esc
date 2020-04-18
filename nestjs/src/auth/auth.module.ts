import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

import { Module } from '@nestjs/common';
import { SsoModule } from '../../libs/sso/src/sso.module';
import { UsersModule } from '../users/users.module';
import { EnglibraryModule } from '../../libs/englibrary/src/englibrary.module';

@Module({
  imports:     [SsoModule, EnglibraryModule, UsersModule],
  providers:   [AuthController, AuthGuard],
  exports:     [AuthController, AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {

}