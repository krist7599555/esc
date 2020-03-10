import { Module } from '@nestjs/common';
import { RethinkdbService } from './rethinkdb.service';
import { RethinkdbProvider } from './rethinkdb.provider';

@Module({
  providers: [RethinkdbService, RethinkdbProvider],
  exports: [RethinkdbService],
})
export class RethinkdbModule {}
