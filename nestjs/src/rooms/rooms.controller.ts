import { Controller, Get, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { ReservationService } from './reservation.service';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Room')
@Controller('api/rooms')
export class RoomsController {

  constructor(
    private roomService: RoomService,
    private reservationService: ReservationService
  ) { }

  @Get('/')
  index() {
    return this.roomService.index();
  }

  @Delete('/')
  reset() {
    return this.roomService.reset();
  }
}