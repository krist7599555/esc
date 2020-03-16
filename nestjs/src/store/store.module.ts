import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations/reservations.service';
import { RethinkConnectionProvider } from './connection.provider';
import { RoomsService } from './rooms/rooms.service';
import { UsersService } from './users/users.service';

@Module({
  imports:   [],
  providers: [UsersService, RoomsService, ReservationsService, RethinkConnectionProvider ],
  exports:   [UsersService, RoomsService, ReservationsService ],
})
export class StoreModule{
}
