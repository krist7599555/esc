import { Module } from '@nestjs/common';
import { UserService } from './state/user.service';
import { UserQuery } from './state/user.query';
import { UsersController } from './users.controller';

@Module({
  imports:     [],
  providers:   [UserService, UserQuery],
  exports:     [UserService, UserQuery],
  controllers: [UsersController],
})
export class UsersModule {}
