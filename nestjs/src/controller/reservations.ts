import { Controller, Get, Param, Post, Body, Put, Query, Delete, ForbiddenException } from '@nestjs/common';
import { r } from 'rethinkdb-ts'
import { Reservations, STATUS_PENDING, RESERVATION_STATUS, ReservationStatus, Reservation } from '../entity/reservation';
import { IsNotEmpty, IsString, IsISO8601 } from 'class-validator'
import { JwtId, IsRoomId, ReservationIdPipe } from '../helper/id';
import { serialize_reservations } from '../serialize';
import { OneOf } from '../pipe/utils';
import { Roles } from 'src/pipe/guard';
import { ROLE_OFFICE } from '../entity/person';
import * as dayjs from 'dayjs'
import * as _ from 'lodash'
import { ParseReservationPipe } from 'src/pipe/parse';

class ReservationCreateDto {
  
  @IsNotEmpty()
  @IsRoomId({ message: "room id is not exist" })
  room: string;
  
  @IsNotEmpty()
  @IsString()
  organization: string;
  
  @IsISO8601()
  arrival_time: string; // implicit conversion
  
  @IsISO8601()
  departure_time: string;
};

interface ReservationFilterDto {
  relative_start_time: number;
  relative_end_time: number;
  iso_start_time: string;
  iso_end_time: string;
}

@Controller("/api/reservations")
export class ReservationsController {
  @Get("/") 
  index(@Query() query: ReservationFilterDto) {
    const start = 
      query.iso_start_time ? dayjs(query.iso_start_time) :
      query.relative_start_time ? dayjs().startOf('day').add(+query.relative_start_time, 'day') : 
      dayjs().startOf('day');
    const end = 
      query.iso_end_time ? dayjs(query.iso_end_time) :
      query.relative_end_time ? dayjs().endOf('day').add(+query.relative_end_time, 'day') : 
      dayjs().endOf('day').add(30, 'day')

    return Reservations
      .between(r.ISO8601(start.format()), r.ISO8601(end.format()), { index: 'arrival_time' })
      .orderBy('arrival_time')
      .run()
      .then(data => serialize_reservations(data, { 
        query,
        start_time: start.format(),
        end_time: end.format(),
        search_range: end.diff(start, 'day'),
        possible_query: {
          relative_start_time: 'number relative to now',
          relative_end_time: 'number relative to now',
          iso_start_time: 'start in format iso8601',
          iso_end_time: 'end in format iso8601',
        },
        dates: _.chain(data)
          .map(rsv => dayjs(rsv.arrival_time).startOf('day').format())
          .sort()
          .uniq()
          .value()
      }))
  }
  
  @Get("/:reservation_id")
  show(
    @Param('reservation_id', ParseReservationPipe) reservation: Reservation
  ) {
    return serialize_reservations(reservation)
  }

  @Delete("/:reservation_id")
  async remove(
    @JwtId() person_id: string,
    @Param('reservation_id', ParseReservationPipe) reservation: Reservation
  ) {
    if (reservation.owner != person_id) throw new ForbiddenException("only owner can delete reservation");
    return {
      data: await Reservations.get(reservation.id).delete().run()
    }
  }

  @Post("/")
  async create(
    @JwtId() owner_id: string,
    @Body() dto: ReservationCreateDto
  ) {
    const wr = await Reservations.insert({
      room: dto.room,
      owner: owner_id,
      approver: null,
      organization: dto.organization,
      arrival_time: r.ISO8601(dto.arrival_time).inTimezone('+07:00'),
      departure_time: r.ISO8601(dto.departure_time).inTimezone('+07:00'),
      created: r.now().inTimezone('+07:00'),
      updated: r.now().inTimezone('+07:00'),
      status: STATUS_PENDING
    }).run();
    return Reservations.get(wr.generated_keys[0]).run().then(serialize_reservations)
  }

  @Put("/:reservation_id/status/:status")
  @Roles(ROLE_OFFICE)
  async update_status(
    @JwtId() approver_id: string,
    @Param('reservation_id', ReservationIdPipe) reservation_id: string,
    @Param('status', new OneOf(RESERVATION_STATUS)) status: ReservationStatus
  ) {
    await Reservations
      .get(reservation_id)
      .update({ 
        status,
        approver: approver_id,
        updated: r.now().inTimezone('+07:00'),
      }, { returnChanges: true })
      .run();
    return Reservations.get(reservation_id).run().then(serialize_reservations);
  }
  
}