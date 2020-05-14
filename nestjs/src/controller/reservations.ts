import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { r } from 'rethinkdb-ts'
import { Reservations } from '../entity/reservations';
import { IsNotEmpty, IsString, IsISO8601 } from 'class-validator'
import { JwtId, IsRoomId } from '../helper/id';
import { ReservationSerializer } from '../serialize';

class ReservationCreateDto {
  
  @IsRoomId()
  room: string;
  
  @IsNotEmpty()
  @IsString()
  organization: string;
  
  @IsISO8601()
  arrival_time: string; // implicit conversion
  
  @IsISO8601()
  departure_time: string;
};

@Controller("/api/reservations")
export class ReservationsController {
  @Get("/") 
  index() {
    return Reservations.run();
  }
  @Get("/:reservationId")
  show(@Param('reservationId') reservationId: string) {
    return Reservations.get(reservationId).run()
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
    }).run();
    return Reservations.get(wr.generated_keys[0]).run().then(data => {
      console.log("ReservationsController -> data", data)
      return ReservationSerializer.serialize(data)
    })
  }
  
}