import { Injectable, Inject } from '@nestjs/common';
import { Table } from './table';
import { RETHINKDB_CONNECTION } from './store/connection.provider';
import { Room } from './rooms/state/room.model';

@Injectable()
export class RoomTable extends Table<Room> {
  constructor(@Inject(RETHINKDB_CONNECTION) conn) {
    super(conn, 'rooms');
  }
}