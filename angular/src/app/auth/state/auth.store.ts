import { Injectable } from '@angular/core'
import { Store, StoreConfig } from '@datorama/akita'

import * as jwt_decode from 'jwt-decode';

export interface AuthState {
  token: string;
  user: {
    id:        string;
    year:      number;
    faculty:   number;
    nameTH:    string;
    surnameTH: string;
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name:       'auth',
  resettable: true,
})
export class AuthStore extends Store<AuthState> {
  constructor() {
    super({
      user:  null,
      token: null,
    })
    this.fetchLocalStorage();
  }
  fetchLocalStorage() {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      const decode = jwt_decode(token)
      if (decode.exp === undefined || decode.exp > new Date().getTime() / 1000) {
        this.update({ user: user, token: token });
      }
    } catch {
      this.reset()
    }
  }
}
