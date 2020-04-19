import { QueryEntity } from '@datorama/akita';
import { Reservation } from './model';
import { ReservationState, ReservationsStore } from './reservations.store';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReservationsQuery
  extends QueryEntity<ReservationState, Reservation> {

  constructor(protected store: ReservationsStore) {
    super(store);
  }
  dates() {
    return this.selectAll().pipe(
      map(rs => rs.map(r => ({
        date: dayjs(r.time_start).startOf('day').format(),
        id:   r.id
      }))),
      map(rs => {
        return _.map(_.groupBy(rs, 'date'), (rids, date) => {
          return { date, ids: _.map(rids, 'id') }
        })
      }),
      map(rs => _.sortBy(rs, 'date'))
    )
  }
}
