import { Module } from '@nestjs/common';
import { RethinkConnectionProvider } from '../store/connection.provider';
import { UsersModule } from '../users/users.module';
import { RoomsController } from './rooms.controller';
import { ReservationQuery } from './state/reservation.query';
import { ReservationService } from './state/reservation.service';
import { ReservationStore } from './state/reservation.store';
import { RoomQuery } from './state/room.query';
import { RoomService } from './state/room.service';
import { RoomStore } from './state/room.store';
import { AuthModule } from 'src/auth/auth.module';
import { StoreModule } from '../store/store.module';

@Module({
  controllers: [RoomsController],
  imports:     [UsersModule, AuthModule, StoreModule],
  providers:   [
    RoomStore,
    RoomQuery,
    RoomService,
    ReservationStore,
    ReservationQuery,
    ReservationService,
  ],
})
export class RoomsModule {

}