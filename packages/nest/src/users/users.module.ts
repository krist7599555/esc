import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RethinkdbModule } from '../rethinkdb/rethinkdb.module';

@Module({
  // imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  imports: [RethinkdbModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
