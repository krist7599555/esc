import { Controller, Get, Param, UsePipes, ValidationPipe, ClassSerializerInterceptor, UseInterceptors, Post, Body } from '@nestjs/common';
import { r } from 'rethinkdb-ts'
import { Reservations, Reservation } from '../entity/reservations';
import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { JwtId } from '../helper/id';
import { JwtDecode } from '../lib/jwt';

class ReservationCreateDto {
  
  @IsNotEmpty()
  @IsString()
  room: string;
  
  @IsNotEmpty()
  @IsString()
  organization: string;
  
  @IsDateString()
  @Type(() => Date)
  startTime: Date;

  @IsDateString()
  @Type(() => Date)
  endTime: Date;
};

@Controller("/api/reservations")
// @UseInterceptors(ClassSerializerInterceptor)
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
  create(
    @JwtDecode() owner: any,
    @Body() reservationCreate: ReservationCreateDto
    ) {
    console.log("ReservationsController -> owner", owner)
    return Reservations.insert({
      ...reservationCreate,
      owner,
      created: r.now(),
      updated: r.now()
    }).run()
  }
  
}