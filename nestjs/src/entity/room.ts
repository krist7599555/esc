import { r } from 'rethinkdb-ts'

export class Room {
  id: string;
  label: string;
  capacity: string;
}

export const Rooms = r.table('rooms');