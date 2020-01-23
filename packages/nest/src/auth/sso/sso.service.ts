import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, tap, flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
          if (data.type === 'error') throw new HttpException(data.content, 400);
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
        map(raw => ({
          _id: raw.ouid,
          nameTH: raw.firstnameth,
          nameEN: raw.firstname,
          surnameTH: raw.lastnameth,
          surnameEN: raw.lastname,
          faculty: +raw.ouid.slice(-2),
          year: +raw.ouid.slice(0, 2),
          email: raw.email,
        })),
      );
  }

  login(username: string, password: string) {
    return this._login(username, password).pipe(flatMap(t => this.profile(t)));
  }

  delete(ticket: string) {
    return this.http.delete(SSO_KILL(ticket));
  }
}
