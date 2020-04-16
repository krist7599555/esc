import { Injectable } from '@nestjs/common';
import { UserQuery } from '../../users/state/user.query';
import { reservations, users, rooms } from '../../db';

@Injectable()
export class ReservationQuery {
  constructor(
    private userQuery: UserQuery,
  ) { }

  all() {
    return reservations.merge(r => ({
      user: users.get(r('userid')).pluck(...this.userQuery.mini_fields),
      room: rooms.get(r('roomid')),
    })).run();
  }
  get(id: string) {
    return reservations.get(id).merge(r => ({
      user: users.get(r('userid')).pluck(...this.userQuery.mini_fields),
      room: rooms.get(r('roomid')),
    })).run();
  }

}