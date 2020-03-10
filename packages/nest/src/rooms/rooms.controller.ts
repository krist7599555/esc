import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { RoomDto } from './room.interface';
import { RoomsService } from './rooms.service';

@Controller('api/rooms')
export class RoomsController {
  constructor(private readonly rooms: RoomsService) {}

  @Get('')
  findRooms() {
    return this.rooms.find();
  }

  // // * CRUD 1 ROOM

  // @Get(':id')
  // async findRoom(@Param('id') id: string) {
  //   const room = await this.rooms.findRoomById(id);
  //   if (!room) throw new NotFoundException('room not found');
  //   return room;
  // }

  // @Post()
  // reserve(@Body() roomDto: RoomDto) {
  //   return this.rooms.create(roomDto);
  // }

  // @Patch(':id')
  // async patchRoom(@Param('id') id: string) {}
}
