import './config';
import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomTable } from './room.table';

@Module({
  imports:     [HttpModule, StoreModule, AuthModule, UsersModule, RoomsModule],
  providers:   [AppService, RoomTable],
  controllers: [AppController],
})
export class AppModule {}
