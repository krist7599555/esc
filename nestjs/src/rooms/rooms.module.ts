import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { RoomsController } from './rooms.controller';
import { ReservationQuery } from './state/reservation.query';
import { ReservationService } from './state/reservation.service';
import { RoomQuery } from './state/room.query';
import { RoomService } from './state/room.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RoomsController],
  imports:     [UsersModule, AuthModule],
  providers:   [
    RoomQuery,
    RoomService,
    ReservationQuery,
    ReservationService,
  ],
})
export class RoomsModule {

}