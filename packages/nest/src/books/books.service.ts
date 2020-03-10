import { Injectable, NotImplementedException } from '@nestjs/common';

import { ReturnModelType } from '@typegoose/typegoose';

import { InjectModel } from 'nestjs-typegoose';

import { BookDto, BookStatus } from './book.interface';
import { Book } from './book.model';
import { RethinkdbService } from '../rethinkdb/rethinkdb.service';
import { RTable } from 'rethinkdb-ts';
import * as _ from 'lodash';

function _assignTo(field) {
  return row => row('left').merge({ [field]: row('right') });
}

@Injectable()
export class BooksService {
  private conn;
  private books: RTable;
  constructor(private readonly r: RethinkdbService) {
    this.conn = r.conn;
    this.books = r.books;
  }

  find() {
    return (
      // prettier-ignore
      this.books
        .eqJoin(  'room_id', this.r.rooms).map(_assignTo('room'))
        .eqJoin('booker_id', this.r.users).map(_assignTo('booker'))
        .run(this.conn)
    );
  }
  create(booker_id: string, room_id: string, detail: any) {
    console.log('TCL: BooksService -> create -> room_id', room_id);
    return this.books
      .insert({
        ...detail,
        booker_id,
        room_id,
        status: 'waiting',
      })
      .run(this.conn);
  }
  // prettier-ignore
  async get(id: string) {
    const res  = await this.r.books.get(id).run(this.conn) as any;
    res.room   = await this.r.rooms.get(res.room_id  ).run(this.conn);
    res.booker = await this.r.users.get(res.booker_id).run(this.conn);
    return res
  }

  // findRoomsByDate(dateStart: string, edatEnd: string) {
  //   throw new NotImplementedException('find rooms by date not implement yet.');
  // }
  // findRoomById(id: string) {
  //   return this.books.findById(id).exec();
  // }
  // // roomsBuildingDetail() {
  // //   return ROOMS_BUILDING;
  // // }
  // // roomsStatus() {
  // //   return ROOMS_STATUS;
  // // }
  // updateStatus(id: string, status: BookStatus) {
  //   return this.books.findByIdAndUpdate(
  //     id,
  //     { status },
  //     {
  //       upsert: false,
  //       new: true,
  //       setDefaultsOnInsert: true,
  //     },
  //   );
  // }
}
