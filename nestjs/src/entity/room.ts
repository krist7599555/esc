import { r } from 'rethinkdb-ts'
import { plainToClass, Expose } from "class-transformer"

export class Room {
  @Expose() id: string;
  @Expose() label: string;
  @Expose() capacity: string;

  static from(obj: Partial<Room>) {
    return plainToClass(Room, obj, { strategy: "excludeAll" })
  }
  constructor(partial: Partial<Room>) {
    Object.assign(this, partial);
  }
}

export const Rooms = r.table('rooms');