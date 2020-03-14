import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { ReservationsStore } from './reservations.store';
import { Reservation } from './model';
import { tap } from 'rxjs/operators';

interface ReserveForm {
  roomid: string;
  organization: string;
  time_start: number;
  time_end: number;
}

@Injectable({ providedIn: 'root' })
export class ReservationService {
  constructor(private reservationStore: ReservationsStore,
              private http: HttpClient) {}

  getReservations() {
    return this.http
      .get<Reservation[]>('/api/reservations')
      .pipe(tap(data => this.reservationStore.set(data)))
  }

  create(form: ReserveForm) {
    return this.http.post<Reservation>('/api/reservations', form).pipe(
      // tap(data => this.reservationStore.add(data))
    )
  }

  adminChangeStatus(reservationId: string, status: Reservation["status"]) {
    return this.http
      .put(`/api/reservations/${reservationId}/status/${status}`, null)
      .pipe(tap(reserv => this.reservationStore.update(reservationId, reserv)))
  }

}
