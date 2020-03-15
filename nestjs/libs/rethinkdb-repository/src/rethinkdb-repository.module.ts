import { Module } from '@nestjs/common';
import { RethinkdbRepositoryService } from './rethinkdb-repository.service';

@Module({
  providers: [RethinkdbRepositoryService],
  exports: [RethinkdbRepositoryService],
})
export class RethinkdbRepositoryModule {}
