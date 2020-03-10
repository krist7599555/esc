import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject } from "rxjs";

import * as dayjs from "dayjs";

import { range, flatMap } from "lodash";

interface ValueLabelField {
  value: string;
  label: string;
}

export const DATE_VALUE_FORMAT = "YYYY-MM-DD";
export const DATE_LABEL_FORMAT = "ddd, D MMMM";
export const TIME_VALUE_FORMAT = "HH:mm";
export const TIME_LABEL_FORMAT = "h:mm";

@Injectable({
  providedIn: "root"
})
export class TimeService {
  public readonly days$ = new BehaviorSubject<ValueLabelField[]>([]);
  public readonly clocks$ = new BehaviorSubject<ValueLabelField[]>([]);

  constructor() {
    const today = dayjs()
      .startOf("day")
      .add(8, "hour");

    // * day$
    const days = range(10)
      .map(i => today.add(i, "day"))
      .map(d => ({
        value: d.format(DATE_VALUE_FORMAT),
        label: d.format(DATE_LABEL_FORMAT)
      }));
    this.days$.next(days);

    // * times$
    const clocks = range(24)
      .map(i => today.add(i * 30, "minute"))
      .map(d => ({
        value: d.format(TIME_VALUE_FORMAT),
        label: d.format(TIME_LABEL_FORMAT)
      }));
    this.clocks$.next(clocks);
  }

  default_bookingtimes() {
    const now = dayjs().startOf("hour");
    return {
      date: now.format(DATE_VALUE_FORMAT),
      start: now.format(TIME_VALUE_FORMAT),
      end: now.add(1, "hour").format(TIME_VALUE_FORMAT)
    };
  }
}
