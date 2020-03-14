import { Injectable } from '@angular/core'


import { BehaviorSubject } from 'rxjs'

import * as dayjs from 'dayjs'
import 'dayjs/locale/th' // load on demand

import * as _ from 'lodash'

interface ValueLabelField {
  value: string;
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  public readonly days$   = new BehaviorSubject<dayjs.Dayjs[]>([])
  public readonly clocks$ = new BehaviorSubject<dayjs.Dayjs[]>([])

  // prettier-ignore
  constructor() {
    dayjs.locale('th');
    const today = dayjs().startOf('day');
    this.days$.next(_.range(0, 15).map(i => today.add(i, 'day')));
    this.clocks$.next(_.range(16, 38).map(i => today.add(i * 30, 'minute')));
  }

  default_bookingtimes() {
    // prettier-ignore
    return {
      date:  dayjs().startOf('day'),
      start: dayjs().startOf('hour'),
      end:   dayjs().startOf('hour').add(1, 'hour')
    };
  }
}
