import * as _ from 'lodash'
import { Component, OnInit } from '@angular/core'
import { ReservationsQuery } from '../reservations.query';
import { AuthQuery } from '../../auth/state/auth.query';
import { ReservationService } from '../reservations.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faHandSparkles } from '@fortawesome/free-solid-svg-icons'
import gsap from 'gsap'
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector:    'app-room',
  templateUrl: './room.component.html',
  styleUrls:   ['./room.component.scss'],
})
export class RoomComponent implements OnInit {
  faHandSparkles = faHandSparkles
  bookingFormActive = false

  filter = new BehaviorSubject({
    room_id: null
  })
  reservationsDates$ = combineLatest(
    this.reservationQuery.dates(),
    this.filter,
    (dates, filt) => {
      return dates
        .map(({ date, ids }) => ({
          date,
          ids: _.filter(ids, id => {
            const r = this.getReservation(id);
            if (filt.room_id && filt.room_id != r.room_id) return false;
            return true;
          })
        }))
        .filter(r => r.ids.length)
    })
  // isReservationsEmpty$ = this.reservationsGroupByDateFilterRoomId$.pipe(map(ar => !ar))

  constructor(
    private authQuery: AuthQuery,
    private reservationQuery: ReservationsQuery,
    private reservationService: ReservationService,
    private router: Router,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    // this.reservationsGroupByDate$.subscribe(console.log)
    this.reservationService.getReservations().subscribe()
  }

  openForm() {
    if (this.authQuery.isLoggedIn()) {
      this.bookingFormActive = true
    } else {
      this.toast.error("require login", "Authenticate")
      this.router.navigate(["/login"])
    }
  }

  trackByIdx(arg) {
    return arg
  }
  trackById(idx, obj) {
    return obj.id
  }
  createdId(id) {
    setTimeout(() => {
      const el = document.querySelector(`.record[data-id="${id}"]`);
      gsap.to(window, { scrollTo: el.getBoundingClientRect().top - 200 });
      gsap.from(el, { duration: 3, opacity: 0, x: 100 })
    }, 0);
  }
  getReservation(id: string) {
    return this.reservationQuery.getEntity(id)
  }
}
