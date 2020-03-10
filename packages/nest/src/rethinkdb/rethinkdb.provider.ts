import { r } from 'rethinkdb-ts';
import { noop } from 'lodash';

export const RETHINK_DB_CONNECTION = 'RETHINK_DB_CONNECTION';
export const RETHINK_DB_NAME = 'esc_rethink';
export const RETHINK_DB_TABLE_USERS = 'users';
export const RETHINK_DB_TABLE_BOOKS = 'books';
export const RETHINK_DB_TABLE_ROOMS = 'rooms';
export const RETHINK_DB_TABLES = [
  RETHINK_DB_TABLE_BOOKS,
  RETHINK_DB_TABLE_ROOMS,
  RETHINK_DB_TABLE_USERS,
];

export const RethinkdbProvider = {
  provide: RETHINK_DB_CONNECTION,
  useFactory: async () => {
    const conn = await r.connect({});
    conn.use(RETHINK_DB_NAME);

    await r
      .dbCreate(RETHINK_DB_NAME)
      .run(conn)
      .catch(noop);

    for (const t of RETHINK_DB_TABLES) {
      await r
        .tableCreate(t)
        .run(conn)
        .catch(noop);
    }
    return conn;
  },
};
