import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports:     [HttpModule, AuthModule, UsersModule, RoomsModule],
  providers:   [AppService],
  controllers: [AppController],
})
export class AppModule {}
