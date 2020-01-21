import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.user.subscribe(data => {
      console.log('user', data)
    })
    this.profile();
  }

  login(username: string, password: string) {
    const res = this.http.post("/api/login", { username, password });
    res.subscribe(() => this.profile() && this.router.navigateByUrl("/"))
    return res;
  }
  logout() {
    const res = this.http.get("/api/logout");
    res.subscribe(
      () => this.user.next(null),
      () => this.user.next(null)
    );
    return res;
  }
  profile() {
    const res = this.http.get("/api/profile");
    res.subscribe(data => this.user.next(data));
    return res;
  }
}

