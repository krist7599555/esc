import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import * as dayjs from 'dayjs'
import * as _ from 'lodash'

import 'dayjs/locale/th' // load on demand
dayjs.locale('th')

interface KCalendaDate {
  iso: string;
  unix: number;
  dayNum: number;
  dayWeek: number;
  month: number;
  monthTH: string;
}

@Component({
  selector:    'app-k-date-picker',
  templateUrl: './k-date-picker.component.html',
  styleUrls:   ['./k-date-picker.component.scss'],
})
export class KDatePickerComponent implements OnInit {
  public active = false
  public value: number = dayjs()
    .startOf('day')
    .unix()

  @Input() set ngModel(value) {
    this.value = dayjs(value)
      .startOf('day')
      .unix()
  }
  @Output() ngModelChange = new EventEmitter()

  public dateList: KCalendaDate[] = []
  public todayUnix = 0


  ngOnInit() {
    const start = dayjs().startOf('month')
    this.todayUnix = dayjs()
      .startOf('day')
      .unix()
    this.dateList = _.range(0, 80).map(i => {
      const day = start.add(i, 'day')
      return {
        iso:     day.format(),
        unix:    day.unix(),
        dayNum:  +day.format('D'),
        dayWeek: +day.format('d'),
        month:   +day.format('M'),
        monthTH: day.format('MMMM'),
      }
    })
  }

  set_select_date(unixDate) {
    console.log(unixDate)
    this.value = unixDate
    this.ngModelChange.emit(dayjs(unixDate).toDate())
  }
  format_unix(unixDate) {
    return dayjs(unixDate).format('D MMMM YYYY')
  }


}
