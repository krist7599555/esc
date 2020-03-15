import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'rethinkdb-ts';
import { RethinkdbRepository } from '../../../libs/repository/src/index';
import { RETHINKDB_CONNECTION } from '../store.provider';
import { User } from './user.entity';

@Injectable()
export class UsersService extends RethinkdbRepository<User> {
  constructor(@Inject(RETHINKDB_CONNECTION) conn: Connection) {
    super(conn, 'users');
  }
}