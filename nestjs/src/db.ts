import { r } from 'rethinkdb-ts';
import { User } from './users/state/user.model';
import { Room } from './rooms/state/room.model';
import { Reservation } from './rooms/state/reservation.model';
import { DATABASE_NAME } from './config';

export const connection_pool = r.connectPool({ db: DATABASE_NAME });
export const users = r.table<User>('users');
export const rooms = r.table<Room>('rooms');
export const reservations = r.table<Reservation>('reservations');
