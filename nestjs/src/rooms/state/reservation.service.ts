import { Injectable, HttpException } from '@nestjs/common';
import { UserQuery } from '../../users/state/user.query';
import { RoomQuery } from './room.query';
import { Reservation } from './reservation.model';
import { zip, iif, throwError, from } from 'rxjs';
import * as _ from 'lodash';
import { flatMap, pluck, tap } from 'rxjs/operators';
import { ReservationQuery } from './reservation.query';
import { reservations } from '../../db';

@Injectable()
export class ReservationService {
  constructor(
    private reservationQuery: ReservationQuery,
    private userQuery: UserQuery,
    private roomQuery: RoomQuery,
  ) { }

  create(o: Reservation) {
    return zip(
      from(this.userQuery.exist(o.userid)),
      from(this.roomQuery.exist(o.roomid)),
    ).pipe(
      tap(console.log),
      flatMap(exits =>
        iif(() => _.every(exits),
          from(reservations.insert(o).run()).pipe(
            pluck('generated_keys', 0),
            flatMap(id => this.reservationQuery.get(id))
          ),
          throwError(new HttpException('user or room is not exist', 400))
        )
      )
    );
  }
}