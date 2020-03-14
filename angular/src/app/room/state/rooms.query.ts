import { QueryEntity } from '@datorama/akita';
import { RoomsState, RoomsStore } from './rooms.store';
import { Room } from './model';
import { Injectable } from '@angular/core';

import * as dayjs from 'dayjs'
import * as _ from 'lodash'
import { of } from 'rxjs';

import * as utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

@Injectable({ providedIn: 'root' })
export class RoomsQuery extends QueryEntity<RoomsState, Room> {
  constructor(protected store: RoomsStore) {
    super(store);
    dayjs.locale('th');
  }

  getDays() {
    return of(_.range(0, 15).map(i => dayjs().startOf('day').add(i, 'day')));
  }
  getTimes() {
    return of(_.range(16, 38).map(i => dayjs.unix(i * 30 * 60).utc()));
  }
}
