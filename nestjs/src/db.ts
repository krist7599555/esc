import * as _ from 'lodash';
import { r } from 'rethinkdb-ts';
import { User } from './users/user.model';
import { Room } from './rooms/room.model';
import { Reservation } from './rooms/reservation.model';
import { DATABASE_NAME } from './config';

export const connection_pool = r.connectPool({ db: DATABASE_NAME });
export const users           = r.table<User>('users');
export const rooms           = r.table<Room>('rooms');
export const reservations    = r.table<Reservation>('reservations');

export async function ensure_table() {
  await connection_pool;
  await r.dbCreate(DATABASE_NAME)    .run().catch(_.noop);
  await r.tableCreate('users')       .run().catch(_.noop);
  await r.tableCreate('reservations').run().catch(_.noop);
  await r.tableCreate('rooms')       .run().catch(_.noop);
  await rooms.insert([
    { id: 'pj2',   label: 'ห้องประชุม 2',   capacity: 10 },
    { id: 'pj3',   label: 'ห้องประชุม 3',   capacity: 10 },
    { id: 'pj4',   label: 'ห้องประชุม 4',   capacity: 10 },
    { id: 'pj5',   label: 'ห้องประชุม 5',   capacity: 10 },
    { id: 'pjesc', label: 'ห้องประชุม กวศ', capacity: 15 },
    { id: 'pjbig', label: 'ห้องประชุม ใหญ่', capacity: 30 },
  ]).run().catch(_.noop);

};

export async function reset() {
  await connection_pool;
  await r.dbDrop(DATABASE_NAME).run().catch(_.noop);
  await ensure_table();
};
