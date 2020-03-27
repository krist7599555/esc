import { Connection, r } from 'rethinkdb-ts';
import { DeepPartial } from 'rethinkdb-ts/lib/internal-types';

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



export class RethinkdbRepository<T = any> {

  public readonly repo = r.table<T>(this.table_name)

  constructor(public readonly conn: Connection,
              public readonly table_name: string) {

    if (!conn)       throw new TypeError('rethinkDB connection is required');
    if (!table_name) throw new TypeError('table_name is required');

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    r.tableCreate(table_name).run(conn).catch(() => { });
  }


  // add(data: T) {return this.repo.insert(data, { returnChanges: true }).run(this.conn);}
  // _add(data: T) { return this.repo.insert(data, { returnChanges: true }); }

  // create(data: T) {return this.repo.insert(data, { returnChanges: true }).run(this.conn);}
  // _create(data: T) {return this.repo.insert(data, { returnChanges: true });}

  // // set(id: string, data: T) {return this.repo.get(id).update(data, { returnChanges: true }).run(this.conn);}
  // // _set(id: string, data: T) {return this.repo.get(id).update(data, { returnChanges: true });}
  // update(id: string, data: DeepPartial<T>) {return this.repo.get(id).update(data, { returnChanges: true }).run(this.conn);}
  // _update(id: string, data: DeepPartial<T>) {return this.repo.get(id).update(data, { returnChanges: true });}

  // upsert(data: T) {return this.repo.insert(data, { returnChanges: true, conflict: 'update' }).run(this.conn);}
  // _upsert(data: T) {return this.repo.insert(data, { returnChanges: true, conflict: 'update' });}

  // remove(id: string) {return this.repo.get(id).delete({ returnChanges: true }).run(this.conn);}
  // _remove(id: string) {return this.repo.get(id).delete({ returnChanges: true });}
  // delete(id: string) {return this.repo.get(id).delete({ returnChanges: true }).run(this.conn);}
  // _delete(id: string) {return this.repo.get(id).delete({ returnChanges: true });}

  // all() {return this.repo.run(this.conn);}
  // _all() {return this.repo;}


  // find(id: string) {return this.repo.get(id).run(this.conn);}
  // _find(id: string) {return this.repo.get(id);}


  // destroy() {return this.repo.delete().run(this.conn);}
  // _destroy() {return this.repo.delete();}
  // clear() {return this.repo.delete().run(this.conn);}
  // _clear() {return this.repo.delete();}

  // exist(id: string) {return this.repo.getAll(id).count().eq(1).run(this.conn);}
  // _exist(id: string) {return this.repo.getAll(id).count().eq(1);}

}
