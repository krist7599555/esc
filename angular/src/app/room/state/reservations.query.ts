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
  groupByDate() {
    return this.selectAll().pipe(
      map(reservs => {
        return _.sortBy(_.toPairs(_.groupBy(reservs, r => dayjs(r.time_start).startOf('day').format())), 0)
      })
    )
  }
}
