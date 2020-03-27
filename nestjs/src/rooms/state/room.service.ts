import { Injectable } from '@nestjs/common'
import { RoomStore } from './room.store'
import { StoreService } from '../../store/store.service'

@Injectable()
export class RoomService {
  rooms = this.store.rooms
  conn  = this.store.conn
  constructor(private store: StoreService) {}
  async reset() {
    await this.rooms.delete().run(this.conn)
    await this.rooms.insert([
      { id: 'pj2', label: 'ห้องประชุม 2', capacity: 10 },
      { id: 'pj3', label: 'ห้องประชุม 3', capacity: 10 },
      { id: 'pj4', label: 'ห้องประชุม 4', capacity: 10 },
      { id: 'pj5', label: 'ห้องประชุม 5', capacity: 10 },
      { id: 'pjesc', label: 'ห้องประชุม กวศ', capacity: 15 },
      { id: 'pjbig', label: 'ห้องประชุม ใหญ่', capacity: 30 },
    ]).run(this.conn)
    return {
      message: 'reset rooms success',
    };
  }
}
