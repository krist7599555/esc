import { Component, OnInit } from '@angular/core'
import { ReservationsQuery } from '../state/reservations.query';
import { AuthQuery } from '../../auth/state/auth.query';
import { ReservationService } from '../state/reservations.service';



@Component({
  selector:    'app-room',
  templateUrl: './room.component.html',
  styleUrls:   ['./room.component.scss'],
})
export class RoomComponent implements OnInit {

  bookingFormActive = false

  showContent: any = {}
  showForm = false

  reservationsGroupByDate$ = this.reservationQuery.groupByDate();

  constructor(
    private authQuery: AuthQuery,
    private reservationQuery: ReservationsQuery,
    private reservationService: ReservationService,
  ) { }

  ngOnInit() {
    this.reservationService.getReservations().subscribe()
  }

  openForm() {
    if (this.authQuery.isLoggedIn()) {
      this.showForm = true
    } else {
      window.open('/login', '_blank')
    }
  }

  trackByIdx(arg) {
    return arg
  }
  trackById(idx, obj) {
    return obj.id
  }
}
