import '@nestjs/core';
import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsModule } from './rooms/rooms.module';
import { AuthModule } from './auth/auth.module';
import { SsoService } from './auth/sso/sso.service';
import { ConfigModule } from '@nestjs/config';
import { SsoModule } from './auth/sso/sso.module';

import configuration from './config';

import * as path from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/esc', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    HttpModule,
    UsersModule,
    RoomsModule,
    AuthModule,
    SsoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
