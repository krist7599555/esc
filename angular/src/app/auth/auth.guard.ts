import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthQuery } from './state/auth.query';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authQuery: AuthQuery,
              private router: Router) { }

  canActivate() {
    if(this.authQuery.isLoggedIn() === true) {
      this.router.navigateByUrl('/');
      return false;
    } else {
      return true;
    }
  }
}
