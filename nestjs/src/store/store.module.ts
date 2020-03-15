import { Module } from '@nestjs/common';
import { RethinkConnectionProvider } from './connection.provider';
import { UsersService } from './users/users.service';
import { RoomsService } from './rooms/rooms.service';
import { ReservationsService } from './reservations/reservations.service';

@Module({
  imports:   [],
  providers: [UsersService, RoomsService, ReservationsService, RethinkConnectionProvider ],
  exports:   [UsersService, RoomsService, ReservationsService ],
})
export class StoreModule { }
