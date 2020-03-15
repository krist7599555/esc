import { Module } from '@nestjs/common';
import { SsoModule } from '../../libs/sso/src/sso.module';
import { EnglibraryModule } from '../../libs/englibrary/src/englibrary.module';
import { AuthController } from './auth.controller';
import { StoreModule } from '../store/store.module';
import { AuthGuard } from './auth.guard';
import { JwtService } from './jwt.service';
import { BcryptService } from './bcrypt.service';

@Module({
  imports:     [SsoModule, EnglibraryModule, StoreModule],
  providers:   [AuthController, AuthGuard, JwtService, BcryptService],
  exports:     [AuthController, AuthGuard, JwtService],
  controllers: [AuthController],
})
export class AuthModule {
  
}