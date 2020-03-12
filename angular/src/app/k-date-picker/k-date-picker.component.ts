import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as dayjs from "dayjs";
import * as _ from "lodash";

import "dayjs/locale/th"; // load on demand
dayjs.locale("th");

interface KCalendaDate {
  iso: string;
  unix: number;
  dayNum: number;
  dayWeek: number;
  month: number;
  monthTH: string;
}

@Component({
  selector: "app-k-date-picker",
  templateUrl: "./k-date-picker.component.html",
  styleUrls: ["./k-date-picker.component.scss"]
})
export class KDatePickerComponent implements OnInit {
  public active = false;
  public value: number = dayjs()
    .startOf("day")
    .unix();

  @Input() set ngModel(value) {
    this.value = dayjs(value)
      .startOf("day")
      .unix();
  }
  @Output() ngModelChange = new EventEmitter();

  public date_list: KCalendaDate[] = [];
  public today_unix: number = 0;

  constructor() {}
  ngOnInit() {
    const start = dayjs().startOf("month");
    this.today_unix = dayjs()
      .startOf("day")
      .unix();
    this.date_list = _.range(0, 80).map(i => {
      const day = start.add(i, "day");
      return {
        iso: day.format(),
        unix: day.unix(),
        dayNum: +day.format("D"),
        dayWeek: +day.format("d"),
        month: +day.format("M"),
        monthTH: day.format("MMMM")
      };
    });
  }

  set_select_date(unix_date) {
    console.log(unix_date);
    this.value = unix_date;
    this.ngModelChange.emit(dayjs(unix_date).toDate());
  }
  format_unix(unix_date) {
    return dayjs(unix_date).format("D MMMM YYYY");
  }

  writeValue(obj: any): void {
    console.log("write valiue");
  }
  registerOnChange(fn: any): void {
    console.log("on chage");
  }
  registerOnTouched(fn: any): void {
    console.log("on touch");
  }
  setDisabledState(isDisabled: boolean): void {
    console.log("disable");
  }
}
