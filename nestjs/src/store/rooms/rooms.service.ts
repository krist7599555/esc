import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'rethinkdb-ts';
import { RethinkdbRepository } from '../../../libs/repository/src/index';
import { RETHINKDB_CONNECTION } from '../connection.provider';
import { Room } from './room.entity';

@Injectable()
export class RoomsService extends RethinkdbRepository<Room> {
  constructor(@Inject(RETHINKDB_CONNECTION) conn: Connection) {
    super(conn, 'rooms');
  }
  _minimal_get(id) {
    return this.repo.get(id).pluck('id', 'label', 'capacity');
  }
  minimal_get(id) {
    return this._minimal_get(id).run;
  }
}