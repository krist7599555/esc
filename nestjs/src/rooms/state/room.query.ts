import { Injectable } from '@nestjs/common';
import { rooms } from '../../db';

@Injectable()
export class RoomQuery {
  constructor() { }
  get(id: string) {
    return rooms.get(id).run();
  }
  all() {
    return rooms.orderBy('capacity', 'id').run();
  }
  exist(id: string) {
    return rooms.getAll(id).count().eq(1).run();
  }
}