import { Controller, Get, Post, Param, Body, Delete, Put, HttpException } from '@nestjs/common';
import { JwtDecode, JwtUser } from '../jwt';
import { CreateReservationDto } from './reservation.model';
import { RoomService } from './room.service';
import { ReservationService } from './reservation.service';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('Room')
@ApiBearerAuth()
@Controller('api/reservations')
export class ReservationsController {

  constructor(
    private roomService: RoomService,
    private reservationService: ReservationService
  ) { }


  @Get('/')
  index() {
    return this.reservationService.index();
  }

  @ApiBody({ type: CreateReservationDto })
  @Post('/')
  async create(
    @JwtDecode() user: JwtUser,
    @Body()      body: CreateReservationDto,
  ) {
    return this.reservationService.create({
      user_id:    user.id,
      room_id:    body.room_id,
      time_start: body.time_start,
      time_end:   body.time_end,
    }).then(id =>
      this.reservationService.show(id)
    );
  }

  @Get('/:reservation_id')
  show(@Param('reservation_id') id: string) {
    return this.reservationService.show(id);
  }

  @Put('/:reservation_id/status/:status')
  update_status(
    @JwtDecode()             user:           JwtUser,
    @Param('reservation_id') reservation_id: string,
    @Param('status')         status:         string,
  ) {
    return this.reservationService.change_status({
      status,
      authorizer_id: user.id,
      reservation_id,
    });
  }

  @Delete('/:reservation_id')
  remove(
    @JwtDecode()             user:           JwtUser,
    @Param('reservation_id') reservation_id: string
  ) {
    return this.reservationService.remove({ user_id: user.id, reservation_id });
  }
}