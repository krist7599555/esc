import { RoomsStore } from './rooms.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from './model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RoomsService {
  constructor(private roomStore: RoomsStore,
              private http: HttpClient) {}

  getRooms() {
    return this.http.get<Room[]>('/api/rooms').pipe(
      tap(data => this.roomStore.set(data))
    )
  }
}
