import { Controller, Get, Param, UsePipes, ValidationPipe, ClassSerializerInterceptor, UseInterceptors, Post, Body } from '@nestjs/common';
import { r } from 'rethinkdb-ts'
import { Reservations, Reservation } from '../entity/reservations';
import { Type } from 'class-transformer';
import { IsDateString } from 'class-validator';

class ReservationCreateDto {
  
  owner: string;
  room: string;
  
  @IsDateString()
  @Type(() => Date)
  startTime: Date;

  @IsDateString()
  @Type(() => Date)
  endTime: Date;
};

@Controller("/api/reservations")
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({
  transform: true,
  skipMissingProperties: false,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
  
}))
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
  create(@Body() reservationCreate: ReservationCreateDto) {
    return Reservations.insert({
      ...reservationCreate,
      created: r.now(),
      updated: r.now()
    }).run()
  }
  
}