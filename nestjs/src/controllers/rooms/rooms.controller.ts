import { All, Controller, Post } from '@nestjs/common';
import { RoomsService } from '../../store/rooms/rooms.service';

@Controller('api/rooms')
export class RoomsController {

  constructor(private rooms: RoomsService) { }


  @Post('reset')
  async reset() {
    await  this.rooms.clear();
    await  this.rooms.create({id: 'pj2',   label: 'ห้องประชุม 2',   capacity: 10, order: 1});
    await  this.rooms.create({id: 'pj3',   label: 'ห้องประชุม 3',   capacity: 10, order: 2});
    await  this.rooms.create({id: 'pj4',   label: 'ห้องประชุม 4',   capacity: 10, order: 3});
    await  this.rooms.create({id: 'pj5',   label: 'ห้องประชุม 5',   capacity: 10, order: 4});
    await  this.rooms.create({id: 'pjesc', label: 'ห้องประชุม กวศ', capacity: 15, order: 5});
    await  this.rooms.create({id: 'pjbig', label: 'ห้องประชุม ใหญ่', capacity: 30, order: 6});
    return this.rooms.all();
  }

  @All('')
  index() {
    return this.rooms.all();
  }
}
