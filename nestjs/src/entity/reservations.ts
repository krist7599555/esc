import { r } from 'rethinkdb-ts'
import { plainToClass, Expose } from "class-transformer"

export class Reservation {
  room: string;
  owner: string;
  approver: string;
  created: Date;
  updated: Date;
}

export const Reservations = r.table('reservations');