import { Component, OnInit, Input, Output, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { EventEmitter } from '@angular/core'


import * as dayjs from 'dayjs'
import * as _ from 'lodash'
import { gsap } from 'gsap';
import { ReservationService } from '../state/reservations.service'
import { RoomsQuery } from '../state/rooms.query';
import { ReservationsQuery } from '../state/reservations.query';
import { RoomsService } from '../state/rooms.service';
import { ToastrService } from 'ngx-toastr';
import { SuperForm } from "angular-super-validator";

@Component({
  selector:    'app-bookingform',
  templateUrl: './bookingform.component.html',
  styleUrls:   ['./bookingform.component.scss'],
})
export class BookingformComponent implements OnInit {

  map = null;
  days$         = this.roomsQuery.getDays();
  times$        = this.roomsQuery.getTimes();
  rooms$        = this.roomsQuery.selectAll();
  reservations$ = this.reservationsQuery.selectAll();
  bookingform   = this.formBuilder.group({
    organization: [null, [Validators.required, Validators.minLength(2)]],
    roomid:       [null, Validators.required],
    date:         [null, [Validators.required, Validators.maxLength(10)]],
    start:        [null, [Validators.required, Validators.maxLength(5)]],
    end:          [null, [Validators.required, Validators.maxLength(5)]],
  });

  @Input() public active = true
  @Output() public activeChange = new EventEmitter()

  constructor(
    private toast:              ToastrService,
    private formBuilder:        FormBuilder,
    private roomsQuery:         RoomsQuery,
    private roomsService:       RoomsService,
    private reservationsQuery:  ReservationsQuery,
    private reservationService: ReservationService,
  ) { }

  close() {
    this.active = false
    this.activeChange.emit(this.active)
  }


  ngOnInit() {
    this.roomsService.getRooms();
    this.rooms$.subscribe(rooms => {
      if (!_.isEmpty(rooms)) {
        let now = dayjs().startOf('hour');
        if (now.hour() > 17) now = now.add(1, 'day').hour(9)
        const hour = _.clamp(now.hour(), 9, 17)
        this.bookingform.patchValue({
          roomid: _.sample(rooms).id,
          date:   now.startOf('day').unix(),
          start:  hour * 3600,
          end:    hour * 3600 + 1800
        })
      }
    })
  }
  onSubmit() {
    if (this.bookingform.valid) {
      const o = this.bookingform.value;
      o.date = +o.date; o.start = +o.start; o.end = +o.end
      if (o.start < o.end && o.end < 24 * 60 * 60 && o.date + o.start > dayjs().startOf('day').unix()) {
        const realoutput = {
          organization: o.organization,
          roomid:       o.roomid,
          time_start:   dayjs.unix(o.date + o.start).format(),
          time_end:     dayjs.unix(o.date + o.end).format(),
        };
        console.log("BookingformComponent -> onSubmit -> realoutput", realoutput)
        this.reservationService
          .create(realoutput)
          .subscribe((reserv) => {
            this.toast.success("reserve complete")
            this.reservationService.getReservations().subscribe(() => {
              setTimeout(() => {
                const query = `.record[data-id="${reserv.id}"]`
                const el = document.querySelector(query);
                gsap.to(window, { scrollTo: el.getBoundingClientRect().top - 200 });
                gsap.from(el, { duration: 3, opacity: 0, x: 100 })
              }, 0);
            })
            this.close()
          });
      } else {
        this.toast.error("date time input is impossible")
      }
    } else {
      const errors = SuperForm.getAllErrors(this.bookingform);
      const key = _.sample(_.keys(errors));
      this.toast.error(_.replace(`${JSON.stringify(errors[key])}`, /[{}"]/g, ""), `invalid ${key}`)
    }
  }


}
