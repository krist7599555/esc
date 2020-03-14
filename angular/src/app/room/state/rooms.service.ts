import { RoomsStore } from './rooms.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from './model';

@Injectable({ providedIn: 'root' })
export class RoomsService {
  constructor(private roomStore: RoomsStore,
              private http: HttpClient) {}

  getRooms() {
    this.http.get<Room[]>('/api/rooms').subscribe(data =>
      this.roomStore.set(data)
    )
  }
}
