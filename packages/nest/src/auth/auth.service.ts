import { Injectable, HttpService, HttpException, Inject } from '@nestjs/common';
import { map, tap, flatMap } from 'rxjs/operators';
import { SsoService } from './sso/sso.service';
import { UsersService } from '../users/users.service';

const SSO_URL = 'https://account.it.chula.ac.th';
const SSO_KILL = ticket => `${SSO_URL}/resources/tickets/${ticket}`;
const SSO_LOGIN = () => `${SSO_URL}/login`;
const SSO_USER = () => `${SSO_URL}/resources/users/me`;

@Injectable()
export class AuthService {
  constructor(
    private readonly sso: SsoService,
    private readonly users: UsersService,
  ) {}
  login(username: string, password: string) {
    return this.sso.login(username, password).pipe(
      tap(console.log),
      tap(d => this.users.create(d)),
    );
  }
}
