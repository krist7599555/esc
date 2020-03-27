import { r, RTable, Connection } from 'rethinkdb-ts';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export class Table<T = any> implements RTable<T> {
  conn: Connection;
  repo: RTable
  constructor(conn: Connection, table_name: string) {
    this.conn = conn;
    this.repo = r.table(table_name);
  }
}
