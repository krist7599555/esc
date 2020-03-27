import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { BcryptService } from './bcrypt.service';

import { JwtService } from './jwt.service';
import { Module } from '@nestjs/common';
import { SsoModule } from '../../libs/sso/src/sso.module';
import { StoreModule } from '../store/store.module';
import { UsersModule } from '../users/users.module';
import { EnglibraryModule } from '../../libs/englibrary/src/englibrary.module';

@Module({
  imports:     [SsoModule, EnglibraryModule, StoreModule, UsersModule],
  providers:   [AuthController, AuthGuard, JwtService, BcryptService],
  exports:     [AuthController, AuthGuard, JwtService],
  controllers: [AuthController],
})
export class AuthModule {

}