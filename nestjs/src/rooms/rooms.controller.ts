import { Controller, Get, NotImplementedException, Post, Param, Body, Delete, Put, HttpException } from '@nestjs/common';
import { JwtDecode, JwtUser } from '../auth/jwt.decorator';
import { CreateReservationDto } from './state/reservation.model';
import { RoomQuery } from './state/room.query';
import { RoomService } from './state/room.service';
import { ReservationQuery } from './state/reservation.query';
import { ReservationService } from './state/reservation.service';
import { flatMap } from 'rxjs/operators';


@Controller('api/rooms')
export class RoomsController {

  constructor(
    private roomQuery: RoomQuery,
    private roomService: RoomService,
    private reservationQuery: ReservationQuery,
    private reservationService: ReservationService
  ) { }

  @Get('')
  indexRooms() {
    return this.roomQuery.all();
  }

  @Delete('')
  clearRooms() {
    return this.roomService.reset();
  }

  @Get('reservations')
  indexReservarions() {
    return this.reservationQuery.all();
  }

  @Post('reservations')
  createReservationAlt() {
    throw new HttpException('[deprecate] move to /api/rooms/:roomid/reservations', 400);
  }

  @Post(':roomid/reservations')
  createReservation(
    @Body()          body:   CreateReservationDto,
    @JwtDecode()     user:   JwtUser,
    @Param('roomid') roomid: string,
  ) {
    return this.reservationService.create({
      userid:     user.sub,
      roomid:     roomid,
      time_start: new Date(body.time_start),
      time_end:   new Date(body.time_end),
      status:     'pending',
    }).pipe(
      flatMap(id => this.reservationQuery.get(id))
    );
  }

  @Put('reservations/:rservid/status/:status')
  putReservationStatus(
    @JwtDecode()      user:    JwtUser,
    @Param('rservid') rservid: string,
    @Param('status')  status:  string,
  ) {
    console.log({
      user, rservid, status,
    });
    throw new NotImplementedException('index_reservation not implement');
  }

  @Delete('reservations/:rservid')
  removeReservation(
    @JwtDecode()      user:    JwtUser,
    @Param('rservid') rservid: string
  ) {
    console.log(user, rservid);
    throw new NotImplementedException('index_reservation not implement');
  }
}