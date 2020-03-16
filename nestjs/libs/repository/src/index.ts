import { r, Connection, RDatum, RQuery, RTable } from 'rethinkdb-ts';

/**
 *
 * RethinkDB intercepter interface for DRY concept
 *
 * Inspire from Hanami::Repository
 * https://guides.hanamirb.org/repositories/overview/
 *
 * giving interface
 *
 * + create(data)     - Create a record for the given data and return an entity
 * + update(id, data) - Update the record corresponding to the id and return the updated entity
 * + delete(id)       - Delete the record corresponding to the given entity
 * + all              - Fetch all the entities from the collection
 * + find(id)         - Fetch an entity from the collection by its ID
 * + clear            - Delete all the records from the collection
 *
 */

export function _pipe_connection<T extends Array<any>, U extends RQuery | RDatum | RTable>(method: (...args: T) => U) {
  return function (...args: T) {
    return method(...args).run(this.conn as Connection);
  };
};

export class RethinkdbRepository<T = any> {

  readonly repo = r.table<T>(this.table_name)

  constructor(protected conn: Connection,
              public table_name: string) {

    if (!conn)       throw new TypeError('rethinkDB connection is required');
    if (!table_name) throw new TypeError('table_name is required');

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    r.tableCreate(table_name).run(conn).catch(() => { });
  }

  create = _pipe_connection(this._create)
  update = _pipe_connection(this._update)
  upsert = _pipe_connection(this._upsert)
  delete = _pipe_connection(this._delete)
  all    = _pipe_connection(this._all)
  find   = _pipe_connection(this._find)
  clear  = _pipe_connection(this._clear)
  exist  = _pipe_connection(this._exist)

  _create(data: T) {
    return this.repo.insert(data, { returnChanges: true });
  }

  _update(id: string, data: T) {
    return this.repo.get(id).update(data, { returnChanges: true });
  }

  _upsert(data: T) {
    return this.repo.insert(data, { returnChanges: true, conflict: 'update' });
  }


  _delete(id: string) {
    return this.repo
      .get(id)
      .delete({ returnChanges: true });
  }


  _all() {
    return this.repo;
  }


  _find(id: string) {
    return this.repo
      .get(id);
  }


  _clear() {
    return this.repo.delete();
  }

  _exist(id: string) {
    return this.repo.get(id).count().eq(1);
  }

}
