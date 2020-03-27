import { Module } from '@nestjs/common';
import { RethinkConnectionProvider } from './connection.provider';
import { StoreService } from './store.service';

@Module({
  imports:   [],
  providers: [RethinkConnectionProvider, StoreService],
  exports:   [RethinkConnectionProvider, StoreService],
})
export class StoreModule{
}
