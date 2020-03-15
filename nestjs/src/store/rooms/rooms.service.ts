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
}