import { Injectable, Inject } from '@nestjs/common';

import { r, R, Connection, RTable, RunOptions } from 'rethinkdb-ts';
import {
  RETHINK_DB_CONNECTION,
  RETHINK_DB_TABLE_USERS,
  RETHINK_DB_TABLE_ROOMS,
  RETHINK_DB_TABLE_BOOKS,
  RETHINK_DB_TABLES,
} from './rethinkdb.provider';
import { noop } from 'lodash';

@Injectable()
export class RethinkdbService {
  // public readonly r: R = r;
  public readonly users: RTable<any>;
  public readonly books: RTable<any>;
  public readonly rooms: RTable<any>;

  constructor(@Inject(RETHINK_DB_CONNECTION) public readonly conn: Connection) {
    this.users = r.table(RETHINK_DB_TABLE_USERS);
    this.books = r.table(RETHINK_DB_TABLE_BOOKS);
    this.rooms = r.table(RETHINK_DB_TABLE_ROOMS);
    this.index().then(noop);
  }
  // prettier-ignore
  async index() {
    await this.books.indexCreate('room_id').run(this.conn).catch(noop)
    await this.books.indexCreate('booker_id').run(this.conn).catch(noop);
  }
}
