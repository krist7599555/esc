import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomSchema } from './room.schema';
import { RethinkdbModule } from '../rethinkdb/rethinkdb.module';

@Module({
  // imports: [MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])],
  imports: [RethinkdbModule],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
