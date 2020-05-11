import { r } from 'rethinkdb-ts'
import { noop } from 'lodash'

export const DB_NAME = "test_fullstack"
export const pool = r.connectPool({ db: DB_NAME })

export async function ensureDatabase() {
  await pool;
  await r.dbCreate(DB_NAME).run().catch(noop);
  await r.tableCreate("people").run().catch(noop);
  await r.tableCreate("rooms").run().catch(noop);
  await r.tableCreate("reservations").run().catch(noop);
  await r.table('rooms').insert([
    { id: 'pj2', label: 'ห้องประชุม 2', capacity: 15 },
    { id: 'pj3', label: 'ห้องประชุม 3', capacity: 15 },
    { id: 'pj4', label: 'ห้องประชุม 4', capacity: 15 },
    { id: 'pj5', label: 'ห้องประชุม 5', capacity: 15 },
    { id: 'pjesc', label: 'ห้องประชุม กวศ', capacity: 15 },
    { id: 'pjbig', label: 'ห้องประชุม ใหญ่', capacity: 15 },
  ]).run();
}