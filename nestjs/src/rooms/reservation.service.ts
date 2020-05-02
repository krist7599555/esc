import { r } from 'rethinkdb-ts';
import { Injectable, HttpException } from '@nestjs/common';
import { reservations, users, rooms } from '../db';
import { Reservation } from './reservation.entity';
import { UserService } from '../users/user.service';
import { RoomService } from './room.service';
import { ROLE_OFFICE } from '../users/user.entity';
import { Room } from './room.entity';

@Injectable()
export class ReservationService {
  constructor(
    private userService: UserService,
    private roomService: RoomService,
  ) { }

  index() {
    return reservations.getField('id').run().then(ids => {
      return Promise.all(ids.map(id => this.show(id)));
    });
  }

  show(id: string) {
    return reservations.get(id).merge<Reservation & {user: any; room: Room}>(r => ({
      user: users.get(r('user_id')).pluck('id', 'nameTH', 'surnameTH', 'faculty', 'year', 'student_id', 'phone'),
      room: rooms.get(r('room_id')),
    })).run();
  }

  exist(id: string) {
    return reservations.getAll(id).count().eq(1).run();
  }

  async create({ user_id, room_id, time_start, time_end, organization }: Reservation) {
    if (time_start > time_end) throw new HttpException('time_start must lessthan time_end', 400);
    return reservations.insert({
      organization,
      user_id,
      room_id,
      time_start:   r.expr(time_start).inTimezone('+07'),
      time_end:     r.expr(time_end)  .inTimezone('+07'),
      created_time: r.now(),
      status:       'pending',
    }).run()
      .then(wr => wr.generated_keys[0]);
  }

  async remove({ user_id, reservation_id }) {
    const reservation = await reservations.get(reservation_id).run();
    if (reservation.user_id != user_id) throw new HttpException('forbidden, only owner can remove reservation', 403);
    return await reservations
      .get(reservation_id)
      .delete({ returnChanges: true })
      .run()
      .then(wr => wr.changes[0].old_val);
  }

  async change_status({ reservation_id, authorizer_id, status }) {
    if (!await this.userService.roles(authorizer_id, ROLE_OFFICE)) throw new HttpException('authorizer_id is not permit', 403);
    if (!await this.exist(reservation_id)) throw new HttpException('reservation_id is not exist', 404);
    await reservations.get(reservation_id).update({
      authorizer_id,
      authorizer_time: r.now(),
      status,
    }).run();
    return this.show(reservation_id);
  }
}