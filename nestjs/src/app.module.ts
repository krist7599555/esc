import './config';
import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ReservationsController } from './controllers/reservations/reservations.controller';
import { RoomsController } from './controllers/rooms/rooms.controller';
import { StoreModule } from './store/store.module';
import { UsersController } from './controllers/users/users.controller';

@Module({
  imports:     [HttpModule, StoreModule, AuthModule],
  providers:   [AppService],
  controllers: [
    AppController,
    UsersController,
    RoomsController,
    ReservationsController,
  ],
})
export class AppModule {}
