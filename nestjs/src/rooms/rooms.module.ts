import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { RoomsController } from './rooms.controller';
import { ReservationService } from './reservation.service';
import { RoomService } from './room.service';
import { AuthModule } from '../auth/auth.module';
import { ReservationsController } from './reservations.controller';

@Module({
  controllers: [RoomsController, ReservationsController],
  imports:     [UsersModule, AuthModule],
  providers:   [
    RoomService,
    ReservationService,
  ],
})
export class RoomsModule {

}