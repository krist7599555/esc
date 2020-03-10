import { Observable } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';

import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../../users/user.interface';
import { SsoToken } from './sso.interface';

const SSO_URL = 'https://account.it.chula.ac.th';
const SSO_LOGIN = `${SSO_URL}/login`;
const SSO_USER = `${SSO_URL}/resources/users/me`;
const SSO_VALIDATE = `${SSO_URL}/serviceValidation`;
const SSO_KILL = ticket => `${SSO_URL}/resources/tickets/${ticket}`;

@Injectable()
export class SsoService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  private _login(username: string, password: string): Observable<string> {
    return this.http
      .get<SsoToken>(SSO_LOGIN, {
        withCredentials: true,
        params: {
          username: username.slice(0, 8),
          password: password,
          service: 'https://account.it.chula.ac.th/html',
          serviceName: 'Chula+SSO',
        },
      })
      .pipe(
        map(res => res.data),
        tap(data => {
          if (data.type === 'error')
            throw new HttpException(data.content, HttpStatus.BAD_REQUEST);
        }),
        map(data => data.ticket),
      );
  }

  profile(ticket: string) {
    return this.http
      .get(SSO_VALIDATE, {
        params: { ticket },
        headers: {
          DeeAppId: this.config.get('sso.id'),
          DeeAppSecret: this.config.get('sso.secret'),
        },
      })
      .pipe(
        map(res => res.data),
        tap(console.log),
        map(
          raw =>
            (({
              id: raw.ouid,
              nameTH: raw.firstnameth,
              nameEN: raw.firstname,
              surnameTH: raw.lastnameth,
              surnameEN: raw.lastname,
              faculty: +raw.ouid.slice(-2),
              year: +raw.ouid.slice(0, 2),
              email: raw.email,
            } as unknown) as User),
        ),
      );
  }

  login(username: string, password: string) {
    return this._login(username, password).pipe(flatMap(t => this.profile(t)));
  }

  delete(ticket: string) {
    return this.http.delete(SSO_KILL(ticket));
  }
}
