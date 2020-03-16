import * as _ from 'lodash';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { flatMap, pluck                    } from 'rxjs/operators';
import { forkJoin, from, iif, throwError   } from 'rxjs';
import { Connection                        } from 'rethinkdb-ts';
import { RETHINKDB_CONNECTION              } from '../connection.provider';
import { Reservation                       } from './reservaiton.entity';
import { RethinkdbRepository               } from '../../../libs/repository/src/index';
import { RoomsService                      } from '../rooms/rooms.service';
import { UsersService                      } from '../users/users.service';
import { r                                 } from 'rethinkdb-ts';

@Injectable()
export class ReservationsService extends RethinkdbRepository<Reservation> {
  constructor(@Inject(RETHINKDB_CONNECTION) conn: Connection,
              private users: UsersService,
              private rooms: RoomsService) {
    super(conn, 'reservations');
  }

  async reserve(data: Reservation){
    return forkJoin(
      from(this.users.exist(data.userid)),
      from(this.rooms.exist(data.roomid)),
    ).pipe(
      flatMap(exists =>
        iif(() => _.every(exists),
          from(this.create(data)).pipe(
            pluck('generated_keys', 0),
            flatMap(id => this.query_network_find(id))
          ),
          throwError(new HttpException('userid or roomis is not exist', 400))
        )
      )
    );

  }

  query_network_find(id) {
    return this.repo.get(id)
      .merge(rsv => ({
        user: this.users._minimal_get(rsv('userid')),
        room: this.rooms._minimal_get(rsv('roomid')),
      }))
      .run(this.conn);
  }
  query_network_all() {
    return this.repo.map(rsv =>
      r.merge(rsv, {
        user: this.users._minimal_get(rsv('userid')),
        room: this.rooms._minimal_get(rsv('roomid')),
      })
    ).run(this.conn);
  }
}