import { r } from 'rethinkdb-ts'

export const STATUS_REJECTED = 'rejected';
export const STATUS_PENDING = 'pending';
export const STATUS_APPROVED = 'approved';
export type ReservationStatus = typeof STATUS_APPROVED | typeof STATUS_PENDING | typeof STATUS_REJECTED;
export const RESERVATION_STATUS: ReservationStatus[] = [STATUS_PENDING, STATUS_REJECTED, STATUS_APPROVED];


type ID = string;
export class Reservation {
  id?: ID;
  room: ID;
  owner: ID;
  approver: ID;
  status: ReservationStatus;
  arrival_time: Date;
  departure_time: Date;
  organization: string;
  created: Date;
  updated: Date;
}

export const Reservations = r.table<Reservation>('reservations');


declare module "@esc" {
  interface Entity {
    reservations: Reservation
  }
}