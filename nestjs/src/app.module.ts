import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth/auth.controller';
import { UsersController } from './controllers/users/users.controller';
import { RoomsController } from './controllers/rooms/rooms.controller';
import { ReservationsController } from './controllers/reservations/reservations.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController, UsersController, RoomsController, ReservationsController],
  providers: [AppService],
})
export class AppModule {}
