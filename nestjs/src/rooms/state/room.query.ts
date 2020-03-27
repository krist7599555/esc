
import { RoomStore } from './room.store';
import { r } from 'rethinkdb-ts';
import { Injectable } from '@nestjs/common';
import { StoreService } from '../../store/store.service';



@Injectable()
export class RoomQuery {
  conn = this.store.conn
  rooms = this.store.rooms
  constructor(private store: StoreService) { }
  get(id: string) {
    return this.rooms.get(id).run(this.conn);
  }
  all() {
    return this.rooms.orderBy('capacity', 'id').run(this.conn);
  }
  exist(id: string) {
    return this.rooms.getAll(id).count().eq(1).run(this.conn);
  }
}