import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { BcryptService } from './bcrypt.service';
import { EnglibraryModule } from '../../libs/englibrary/src/englibrary.module';
import { JwtService } from './jwt.service';
import { Module } from '@nestjs/common';
import { SsoModule } from '../../libs/sso/src/sso.module';
import { StoreModule } from '../store/store.module';

@Module({
  imports:     [SsoModule, EnglibraryModule, StoreModule],
  providers:   [AuthController, AuthGuard, JwtService, BcryptService],
  exports:     [AuthController, AuthGuard, JwtService],
  controllers: [AuthController],
})
export class AuthModule {

}