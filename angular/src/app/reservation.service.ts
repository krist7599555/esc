import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject } from "rxjs";
import { tap, map } from "rxjs/operators";
import * as dayjs from "dayjs";
import * as _ from "lodash";
interface ReserveForm {
  roomid: string;
  organization: string;
  time_start: number;
  time_end: number;
}

@Injectable({
  providedIn: "root"
})
export class ReservationService {
  public readonly rooms$ = new BehaviorSubject<any[]>(null);
  public readonly reservations$ = new BehaviorSubject<any[]>([]);
  public readonly reservations_group_by_date$ = this.reservations$.pipe(
    map(records =>
      _.groupBy(records, r =>
        dayjs(r.time_start)
          .startOf("day")
          .unix()
      )
    ),
    map(_.toPairs),
    map(arr => _.sortBy(arr, 0))
  );

  constructor(private http: HttpClient) {
    this.http
      .get("/api/reservations")
      .subscribe(data => this.reservations$.next(data as any));
    this.http
      .get("/api/rooms")
      .subscribe(data => this.rooms$.next(data as any));
  }

  reserve(form: ReserveForm) {
    return this.http.post("/api/reservations", form);
  }

  admin_change_reservation_status(rsevid, new_status) {
    // TODO admin change status
    return this.http.put(`/api/reservations/${rsevid}/status`, new_status);
  }
}
