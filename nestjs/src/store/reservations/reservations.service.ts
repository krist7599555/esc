import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'rethinkdb-ts';
import { RethinkdbRepository } from '../../../libs/repository/src/index';
import { RETHINKDB_CONNECTION } from '../connection.provider';
import { Reservation } from './reservaiton.entity';

@Injectable()
export class ReservationsService extends RethinkdbRepository<Reservation> {
  constructor(@Inject(RETHINKDB_CONNECTION) conn: Connection) {
    super(conn, 'reservations');
  }
}