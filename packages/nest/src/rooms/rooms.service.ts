import { Model } from 'mongoose';

import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RethinkdbService } from '../rethinkdb/rethinkdb.service';

import { ROOMS_BUILDING, ROOMS_STATUS } from './constant';
import { Room, RoomDto, RoomStatus } from './room.interface';
import { RTable, Connection } from 'rethinkdb-ts';

@Injectable()
export class RoomsService {
  private rooms: RTable<any>;
  private conn: Connection;
  constructor(private readonly r: RethinkdbService) {
    this.rooms = r.rooms;
    this.conn = r.conn;
    this.reset().then();
  }
  async reset() {
    await this.rooms.delete().run(this.conn);
    await Promise.all(
      ROOMS_BUILDING.map(room => this.rooms.insert(room).run(this.conn)),
    );
    return 'Reset Rooms';
  }
  find() {
    return this.rooms.run(this.conn);
  }
}
