import { r } from 'rethinkdb-ts'

type ID = string;
export class Reservation {
  id?: ID;
  room: ID;
  owner: ID;
  approver: ID;
  arrival_time: Date;
  departure_time: Date;
  organization: string;
  created: Date;
  updated: Date;
}

export const Reservations = r.table<Reservation>('reservations');