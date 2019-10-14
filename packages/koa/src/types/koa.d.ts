import { BaseContext } from 'koa';
import { Collection, Db } from 'mongodb';

import { User } from './user';
import { Room } from './room';

declare module 'koa' {
  interface BaseContext {
    db: Db;
    users: Collection<User>;
    rooms: Collection<Room>;
  }
}
