import { Injectable, Inject } from '@nestjs/common';
import { RETHINKDB_CONNECTION } from '../../store/connection.provider';
import { RethinkdbRepository } from '../../../libs/repository/src/index';
import { Room } from './room.model';

@Injectable()
export class RoomStore extends RethinkdbRepository<Room> {
  constructor(@Inject(RETHINKDB_CONNECTION) conn) {
    super(conn, 'rooms');
  }
}