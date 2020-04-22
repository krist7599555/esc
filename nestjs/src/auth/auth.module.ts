import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports:     [UsersModule],
  providers:   [AuthController, AuthGuard, AuthService],
  exports:     [AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {

}