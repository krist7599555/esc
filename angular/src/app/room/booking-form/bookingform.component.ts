import * as dayjs from 'dayjs'
import * as _ from 'lodash'
import { Component, OnInit, Input, Output, ElementRef } from '@angular/core' ;
import { FormBuilder, Validators } from '@angular/forms'
import { EventEmitter } from '@angular/core'
import { ReservationService, ReservationForm } from '../reservations.service';
import { RoomsQuery } from '../rooms.query' ;
import { ReservationsQuery } from '../reservations.query' ;
import { RoomsService } from '../rooms.service' ;
import { ToastrService } from 'ngx-toastr' ;


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
    organization: [null, [Validators.required]],
    room_id:      [null, [Validators.required]],
    date:         [null, [Validators.required]],
    start:        [null, [Validators.required]],
    end:          [null, [Validators.required]],
  });
  // bookingForm = new BehaviorSubject<{organization: string; room_id: string; date: number; start: number; end: number;}>({
  //   organization: null,
  //   room_id:      null,
  //   date:         null,
  //   start:        null,
  //   end:          null,
  // })
  // bookingDto = new BehaviorSubject<ReservationForm>();

  @Input()  public active = true
  @Output() public activeChange = new EventEmitter<boolean>()
  @Output() public createdId = new EventEmitter<string>()

  constructor(
    private hostRef:            ElementRef,
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


  async ngOnInit() {
    // time
    let now = dayjs().startOf('hour');
    if (now.hour() > 17) now = now.add(1, 'day').hour(9)
    const hour = _.clamp(now.hour(), 9, 17)
    this.bookingform.patchValue({
      date:  now.startOf('day').unix(),
      start: hour * 3600,
      end:   hour * 3600 + 1800
    })
    // room_id
    this.roomsService.getRooms().subscribe(rooms => {
      if (!_.isEmpty(rooms)) {
        this.bookingform.patchValue({
          room_id: _.sample(rooms).id,
        })
      }
    })
  }
  async onSubmit() {
    const o = this.bookingform.value;
    const o2: ReservationForm = {
      organization: o.organization,
      room_id:      o.room_id,
      time_start:   dayjs.unix(+o.date + +o.start).format(),
      time_end:     dayjs.unix(+o.date + +o.end).format(),
    }
    // if (o.start < o.end && o.end < 24 * 60 * 60 && o.date + o.start > dayjs().startOf('day').unix()) {

    const { id } = await this.reservationService.create(o2).toPromise()
    await this.reservationService.getReservations().toPromise();

    // scroll
    this.createdId.emit(id);
    // setTimeout((host: HTMLElement, id: string) => {
    //   console.log(host, id)
    //   const el = document.querySelector(`.record[data-id="${id}"]`);
    //   console.log(el)
    //   gsap.to(window, { scrollTo: el.getBoundingClientRect().top - 200 });
    //   gsap.from(el, { duration: 3, opacity: 0, x: 100 })
    this.close()
    // }, 500, this.hostRef.nativeElement, id);

  }

}
