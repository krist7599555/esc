import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JwtDecode, JwtUser } from '../../auth/jwt.decorator';
import { ReservationsService } from '../../store/reservations/reservations.service';
import { ReserveDto } from './reservations.dto';

@Controller('api/reservations')
export class ReservationsController {

  constructor(private reservations: ReservationsService) {}

  @Post()
  create(
    @JwtDecode() usr: JwtUser,
    @Body() body: ReserveDto,
  ) {
    return this.reservations.reserve({ ...body, userid: usr.sub });
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.reservations.find(id);
  }

  @Get('')
  index() {
    return this.reservations.query_network_all();
  }
}
