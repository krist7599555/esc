import { Controller, Post, Body, UseFilters, Get, Param } from '@nestjs/common';

import { MongooseExceptionsFilter } from '../utils/mongo';

import { BooksService } from './books.service';
import { Jwt } from '../utils/jwt';
import { JwtPayload } from '../utils/jwt';

// @UseFilters(MongooseExceptionsFilter)
@Controller('api/books')
export class BooksController {
  constructor(private readonly books: BooksService) {}

  @Get()
  find() {
    return this.books.find();
  }

  @Post('/:room_id')
  create(@Jwt() jwt: JwtPayload, @Param('room_id') room_id, @Body() body) {
    return this.books.create(jwt.sub, room_id, body);
  }
  @Get('/:room_id')
  get(@Param('room_id') room_id) {
    return this.books.get(room_id);
  }
}
