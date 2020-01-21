import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { of } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { Router } from "@angular/router";


@Injectable({
  providedIn: "root"
})
export class RoomService {
  private _rooms = new BehaviorSubject<any>(null);
  private _roomsByDate = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.http.get("/api/rooms").subscribe({
      next: data => this._rooms.next(data),
      error: err => console.error(err)
    });
    this.http.get("/api/rooms/byDate").subscribe({
      next: data => this._roomsByDate.next(data),
      error: err => console.error(err)
    });
  }

  get rooms() {
    return this._rooms;
  }
  get roomsByDate() {
    return this._roomsByDate;
  }
  get roomsLabel() {
    return {
      "pj2": "ป.ช. 2",
      "pj3": "ป.ช. 3",
      "pj4": "ป.ช. 4",
      "esc": "ป.ช. กวศ.",
      "big": "ป.ช. ใหญ่",
    }
  }
  reserve(form) {
    console.log("TCL: RoomService -> reserve -> form", form);
    return this.http.post("/api/rooms", form).pipe(
      tap(
        () => {},
        err => {
          if (err.status == 401) {
            window.open("/login", "_blank");
          }
        }
      )
    );
  }
  _patchRoom(id, obj) {
    return this.http.patch(`/api/rooms/${id}`, obj)
  }
  updateStatus(id, status) {
    return this._patchRoom(id, { status })
  }
}
