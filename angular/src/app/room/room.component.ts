import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import "dayjs/locale/th";
import * as dayjs from "dayjs";

import * as _ from "lodash";

import { AuthService } from "../auth.service";
import { ReservationService } from "../reservation.service";
import { TimeService } from "../times.service";

dayjs.locale("th");

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.scss"]
})
export class RoomComponent {
  public bookingFormActive = false;

  public dayjs: any = dayjs;
  public showContent: any = {};
  public showForm = false;

  constructor(
    private auth: AuthService,
    public reservationService: ReservationService,
    public day: TimeService
  ) {}

  openForm() {
    if (this.auth.isAuthed()) {
      this.showForm = true;
    } else {
      window.open("/login", "_blank");
    }
  }
}
