import { Component, OnInit, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventEmitter } from "@angular/core";

import "dayjs/locale/th";
import * as dayjs from "dayjs";

import * as _ from "lodash";

import { AuthService } from "../../auth.service";
import { ReservationService } from "../../reservation.service";
import { TimeService } from "../../times.service";

@Component({
  selector: "app-bookingform",
  templateUrl: "./bookingform.component.html",
  styleUrls: ["./bookingform.component.scss"]
})
export class BookingformComponent implements OnInit {
  @Input("active") public active = true;
  @Output("active") public activeChange = new EventEmitter();

  setActive(val) {
    this.active = !!val;
    this.activeChange.emit(this.active);
  }

  public bookingform: FormGroup = null;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public reservationService: ReservationService,
    public times: TimeService
  ) {}

  // prettier-ignore
  ngOnInit() {
    const init = this.times.default_bookingtimes();
    this.bookingform = this.formBuilder.group({
      organization: [null,              Validators.required],
      roomid:       [null,              Validators.required],
      date:         [init.date .unix(), Validators.required],
      start:        [init.start.unix(), Validators.required],
      end:          [init.end  .unix(), Validators.required],
    });
    this.reservationService.rooms$.subscribe(rooms => {
      if (!_.isEmpty(rooms)) {
        this.bookingform.patchValue({
          roomid: _.sample(rooms).id
        })
      }
    })
  }

  // prettier-ignore
  onSubmit() {
    if (this.bookingform.valid) {
      dayjs.locale("th");
      const val = this.bookingform.value;
      const d = dayjs.unix(val.date).startOf("day");
      const s = dayjs.unix(val.start);
      const t = dayjs.unix(val.end);
      const realoutput = {
        organization: val.organization,
        roomid: val.roomid,
        time_start: d.set("hour", s.hour()).set("minute", s.minute()).unix(),
        time_end:   d.set("hour", t.hour()).set("minute", t.minute()).unix()
      };

      this.reservationService.reserve(realoutput).subscribe(() => {
        this.setActive(false);
      });
    }
  }

  changeStatus(id, event) {
    this.reservationService
      .admin_change_reservation_status(id, event.target.value)
      .subscribe(() => {
        window.location.reload();
      });
  }
  openForm() {
    if (this.auth.isAuthed()) {
      // this.showForm = true;
    } else {
      window.open("/login", "_blank");
    }
  }
}
