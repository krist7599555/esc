import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './user.interface';
import { RethinkdbService } from '../rethinkdb/rethinkdb.service';
import { RTable } from 'rethinkdb-ts';

@Injectable()
export class UsersService {
  private users: RTable<User>;
  private conn;
  constructor(private readonly r: RethinkdbService) {
    this.users = r.users;
    this.conn = r.conn;
  }

  create(user: User) {
    return this.users.insert(user).run(this.conn);
  }

  find() {
    return this.users
      .merge(user => ({
        booking: this.r.books
          .getAll(user('id'), { index: 'booker_id' })
          .coerceTo('array'),
      }))
      .run(this.conn);
  }

  get(id: string) {
    return this.users
      .get(id)
      .merge(user => ({
        booking: this.r.books
          .getAll(user('id'), { index: 'booker_id' })
          .coerceTo('array'),
      }))
      .run(this.conn);
  }
}
