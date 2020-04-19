import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Reservation } from './model';

export type ReservationState = EntityState<Reservation>

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'reservations', idKey: 'id' })
export class ReservationsStore extends EntityStore<ReservationState, Reservation> {
  constructor() {
    super();
  }
}

