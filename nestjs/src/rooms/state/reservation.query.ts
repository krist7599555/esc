import { Injectable } from '@nestjs/common';
import { ReservationStore } from './reservation.store';
import { RoomQuery } from './room.query';
import { UserQuery } from '../../users/state/user.query';
import { StoreService } from '../../store/store.service';

@Injectable()
export class ReservationQuery {
  conn = this.store.conn;
  reservations = this.store.reservations;
  constructor(
    private store: StoreService,
    private userQuery: UserQuery,
  ) { }

  all() {
    return this.reservations.merge(r => ({
      user: this.store.users.get(r('userid')).pluck(...this.userQuery.mini_fields),
      room: this.store.rooms.get(r('roomid')),
    })).run(this.conn);
  }
  get(id: string) {
    return this.reservations.get(id).merge(r => ({
      user: this.store.users.get(r('userid')).pluck(...this.userQuery.mini_fields),
      room: this.store.rooms.get(r('roomid')),
    })).run(this.conn);
  }

}