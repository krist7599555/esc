import { Injectable, Inject } from '@nestjs/common';
import { RETHINKDB_CONNECTION } from '../../store/connection.provider';
import { RethinkdbRepository } from '../../../libs/repository/src/index';
import { User } from './user.model';

@Injectable()
export class UserStore extends RethinkdbRepository<User> {
  constructor(@Inject(RETHINKDB_CONNECTION) conn) {
    super(conn, 'users');
  }
}