import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { BehaviorSubject, Observable } from "rxjs";
import { of } from "rxjs";
import { delay, tap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RoomService {
  public rooms$ = new BehaviorSubject<any[]>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.http.get<any[]>("/api/rooms").subscribe({
      next: data => {
        console.log("TCL: RoomService -> constructor -> data", data);
        this.rooms$.next(data);
      }
    });
  }

  _patchRoom(id, obj) {
    return this.http.patch(`/api/rooms/${id}`, obj);
  }
  updateStatus(id, status) {
    return this._patchRoom(id, { status });
  }
}
