import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { ReservationsStore } from './reservations.store';
import { Reservation } from './model';
import { tap } from 'rxjs/operators';

export interface ReservationForm {
  room_id: string;
  organization: string;
  time_start: string;
  time_end: string;
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

  create(form: ReservationForm) {
    return this.http.post<Reservation>(`/api/reservations`, form)
  }

  adminChangeStatus(reservationId: string, status: Reservation["status"]) {
    return this.http
      .put(`/api/reservations/${reservationId}/status/${status}`, null)
      .pipe(tap(reserv => this.reservationStore.update(reservationId, reserv)))
  }

}
