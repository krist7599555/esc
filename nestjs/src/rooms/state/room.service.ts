import { Injectable } from '@nestjs/common';
import { rooms } from '../../db';

@Injectable()
export class RoomService {
  constructor() {}
  async reset() {
    await rooms.delete().run();
    await rooms.insert([
      { id: 'pj2', label: 'ห้องประชุม 2', capacity: 10 },
      { id: 'pj3', label: 'ห้องประชุม 3', capacity: 10 },
      { id: 'pj4', label: 'ห้องประชุม 4', capacity: 10 },
      { id: 'pj5', label: 'ห้องประชุม 5', capacity: 10 },
      { id: 'pjesc', label: 'ห้องประชุม กวศ', capacity: 15 },
      { id: 'pjbig', label: 'ห้องประชุม ใหญ่', capacity: 30 },
    ]).run();
    return {
      message: 'reset rooms success',
    };
  }
}
