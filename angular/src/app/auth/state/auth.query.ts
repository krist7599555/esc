import { Injectable } from '@angular/core'
import { Query } from '@datorama/akita'
import { AuthState, AuthStore } from './auth.store'

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {

  isLoggedIn$ = this.select(state => !!state.token)
  isLoggedIn() {
    return !!this.getValue().token
  }

  profile$ = this.select(state => state.user)
  profile() {
    return this.getValue().user
  }

  constructor(protected store: AuthStore) {
    super(store)
  }
}
