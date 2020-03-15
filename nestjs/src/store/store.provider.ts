import { config } from '../config';
import { r } from 'rethinkdb-ts';

export const RETHINKDB_CONNECTION = Symbol('RETHINKDB_CONNECTION');
export const RethinkConnectionProvider = {
  provide:    RETHINKDB_CONNECTION,
  useFactory: async () => {
    return r.connect({ db: config.db_name });
  },
};