import { Controller, Get } from '@nestjs/common';

@Controller('reservations')
export class ReservationsController {

  @Get()
  index() {
    // TODO
  }

  @Get(':id')
  show() {
    // TODO
  }

}
