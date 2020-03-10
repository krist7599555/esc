import '@nestjs/core';
import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { TypegooseModule } from 'nestjs-typegoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config';

import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';
import { SsoModule } from './auth/sso/sso.module';
import { RethinkdbModule } from './rethinkdb/rethinkdb.module';
// import { Rethinkdb } from './rethinkdb.provider';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/esc', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    //   useCreateIndex: true,
    // }),
    // TypegooseModule.forRoot('mongodb://localhost:27017/nest', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    //   useCreateIndex: true,
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule.register({
      secret: 'superHarDySecret',
    }),
    HttpModule,
    RethinkdbModule,
    UsersModule,
    RoomsModule,
    AuthModule,
    SsoModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
