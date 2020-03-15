import { r, Connection } from 'rethinkdb-ts';

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
  
  readonly repo = r.table<T>(this.table_name)

  constructor(private conn: Connection,
              public table_name: string) {
                
    if (!conn)       throw new TypeError('rethinkDB connection is required');
    if (!table_name) throw new TypeError('table_name is required');

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    r.tableCreate(table_name).run(conn).catch(() => { });
  }

  create(data: T) {
    return this.repo
      .insert(data, { returnChanges: true })
      .run(this.conn);
  }

  update(id: string, data: T) {
    return this.repo
      .get(id)
      .update(data, { returnChanges: true })
      .run(this.conn);
  }

  upsert(data: T) {
    return this.repo
      .insert(data, { returnChanges: true, conflict: 'update' })
      .run(this.conn);
  }

  delete(id: string) {
    return this.repo
      .get(id)
      .delete({ returnChanges: true })
      .run(this.conn);
  }

  all() {
    return this.repo
      .run(this.conn);
  }

  find(id: string) {
    return this.repo
      .get(id)
      .run(this.conn);
  }
    
  clear() {
    return this.repo
      .delete()
      .run(this.conn);
  }
  
  exist(id: string) {
    return this.repo
      .get(id)
      .count()
      .eq(1)
      .run(this.conn);
  }

  network_find(id: string) {
    console.warn(`repo[${this.table_name}] use default network_find`);
    return this.find(id);
  }
  
  network_all() {
    console.warn(`repo[${this.table_name}] use default network_all`);
    return this.all();
  }
  
}
