import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'rethinkdb-ts';
import { RETHINKDB_CONNECTION } from '../connection.provider';
import { RethinkdbRepository } from '../../../libs/repository/src/index';
import { User } from './user.entity';

@Injectable()
export class UsersService extends RethinkdbRepository<User> {
  constructor(@Inject(RETHINKDB_CONNECTION) conn: Connection) {
    super(conn, 'users');
  }
  _minimal_get(id) {
    return this.repo.get(id).pluck('id', 'nameTH', 'surnameTH');
  }
  minimal_get(id) {
    return this._minimal_get(id).run;
  }
}