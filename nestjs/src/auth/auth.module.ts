import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { EnglibraryModule } from '../../libs/englibrary/src/englibrary.module';

@Module({
  imports:     [EnglibraryModule, UsersModule],
  providers:   [AuthController, AuthGuard],
  exports:     [AuthController, AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {

}