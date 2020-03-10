import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { BehaviorSubject } from "rxjs";
import { tap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public user$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.profile().subscribe();
  }

  isAuthed() {
    return !!this.user$.value;
  }

  login(username: string, password: string) {
    return this.http.post("/api/login", { username, password }).pipe(
      tap((data: any) => localStorage.setItem("token", data.access_token)),
      map(() => this.profile()),
      tap(() => this.router.navigateByUrl("/"))
    );
  }

  logout() {
    localStorage.removeItem("token");
    this.user$.next(null);
  }

  profile() {
    return this.http
      .get("/api/profile")
      .pipe(tap(data => this.user$.next(data)));
  }
}
