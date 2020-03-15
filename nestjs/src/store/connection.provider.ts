import { r } from 'rethinkdb-ts';
import { config } from '../config';
import * as _ from 'lodash';

export const RETHINKDB_CONNECTION = Symbol('RETHINKDB_CONNECTION');
export const RethinkConnectionProvider = {
  provide:    RETHINKDB_CONNECTION,
  useFactory: async () => {
    const conn = await r.connect({ db: config.db_name });
    await r.dbCreate(config.db_name).run(conn).catch(_.noop);
    return conn;
  },
};