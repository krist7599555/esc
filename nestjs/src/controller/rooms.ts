import { Controller, Get, Param, UsePipes, ValidationPipe, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
// import { r } from 'rethinkdb-ts'
import { Rooms } from '../entity/room';
import { RoomSerializer } from '../serialize';

@Controller("/api/rooms")
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({
  transform: true,
  skipMissingProperties: false,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
  
}))
export class RoomsController {
  @Get("/") 
  async index() {
    return Rooms.run()
      .then(res => RoomSerializer.serialize(res))
  }
  @Get("/:roomId")
  show(@Param('roomId') roomId: string) {
    return Rooms.get(roomId).run()
      .then(data => RoomSerializer.serialize(data))
  }
  
}