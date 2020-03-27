import { Module } from '@nestjs/common';
import { UserStore } from './state/user.store';
import { UserService } from './state/user.service';
import { UserQuery } from './state/user.query';
import { UsersController } from './users.controller';
import { StoreModule } from '../store/store.module';

@Module({
  imports:     [StoreModule],
  providers:   [UserService, UserQuery, UserStore],
  exports:     [UserService, UserQuery],
  controllers: [UsersController],
})
export class UsersModule {}
