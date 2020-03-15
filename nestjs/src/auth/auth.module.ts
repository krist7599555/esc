import { Module } from '@nestjs/common';
import { SsoModule } from '../../libs/sso/src/sso.module';
import { EnglibraryModule } from '../../libs/englibrary/src/englibrary.module';
import { AuthController } from './auth.controller';
import { StoreModule } from '../store/store.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports:   [SsoModule, EnglibraryModule, StoreModule],
  providers: [AuthController, AuthGuard],
  exports:   [AuthController, AuthGuard],
})
export class AuthModule {
  
}