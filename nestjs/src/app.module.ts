import './config';
import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users/users.controller';
import { RoomsController } from './controllers/rooms/rooms.controller';
import { ReservationsController } from './controllers/reservations/reservations.controller';
import { StoreModule } from './store/store.module';
import { AuthModule } from './auth/auth.module';

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
