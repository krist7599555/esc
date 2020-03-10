import { Module } from '@nestjs/common';

// import { TypegooseModule } from 'nestjs-typegoose';

// import { Book } from './book.model';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { RethinkdbModule } from '../rethinkdb/rethinkdb.module';

@Module({
  // imports: [TypegooseModule.forFeature([Book])],
  imports: [RethinkdbModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
