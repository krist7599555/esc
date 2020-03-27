import { Injectable, Inject } from '@nestjs/common';
import { RETHINKDB_CONNECTION } from '../../store/connection.provider';
import { RethinkdbRepository } from '../../../libs/repository/src/index';
import { Reservation } from './reservation.model';

@Injectable()
export class ReservationStore extends RethinkdbRepository<Reservation> {
  constructor(@Inject(RETHINKDB_CONNECTION) conn) {
    super(conn, 'reservations');
  }
}