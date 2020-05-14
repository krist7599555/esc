import { Controller, Get, Param, UsePipes, ValidationPipe, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Rooms } from '../entity/room';
import { serialize_rooms } from '../serialize';

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
    return Rooms.run().then(serialize_rooms)
  }
  @Get("/:roomId")
  show(@Param('roomId') roomId: string) {
    return Rooms.get(roomId).run().then(serialize_rooms)
  }
  
}