import { Injectable, Inject } from '@nestjs/common';
import { RETHINKDB_CONNECTION } from './connection.provider';
import { r, Connection } from 'rethinkdb-ts';
import { Room } from 'src/rooms/state/room.model';
import { User } from 'src/users/state/user.model';
import { Reservation } from 'src/rooms/state/reservation.model';


@Injectable()
export class StoreService {
  public readonly rooms = r.table<Room>('rooms')
  public readonly users = r.table<User>('users')
  public readonly reservations = r.table<Reservation>('reservations')
  constructor(@Inject(RETHINKDB_CONNECTION) public readonly conn: Connection) {}
}