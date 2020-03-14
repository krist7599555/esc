import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthStore } from './auth.store'
import { tap, finalize } from 'rxjs/operators'


@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authStore: AuthStore,
              private http: HttpClient) { }

  login(cred: { username: string; password: string; }) {
    this.authStore.setLoading(true);
    return this.http.post('/api/login', cred).pipe(
      tap((data: any) => {
        localStorage.setItem("token", data.access_token)
        localStorage.setItem("user", JSON.stringify(data.profile))
        this.authStore.fetchLocalStorage()
      }),
      finalize(() => this.authStore.setLoading(false))
    )
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.authStore.reset()
  }


}
