import { BaseContext } from 'koa';
import { Collection, Db } from 'mongodb';

declare module 'koa' {
  interface BaseContext {
    db: Db;
    users: Collection<User>;
  }
}
