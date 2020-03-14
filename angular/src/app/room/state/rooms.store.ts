import { Injectable } from '@angular/core';
import { StoreConfig, EntityStore, EntityState } from '@datorama/akita';
import { Room } from './model';

export type RoomsState = EntityState<Room>;

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'rooms', idKey: 'id' })
export class RoomsStore extends EntityStore<EntityState<Room>, Room> {

  constructor() {
    super();
  }

}

