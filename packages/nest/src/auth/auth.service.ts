import { map, tap } from 'rxjs/operators';

import { Injectable } from '@nestjs/common';

import { User } from '../users/user.interface';
import { UsersService } from '../users/users.service';
import { signUser } from '../utils/jwt';
import { SsoService } from './sso/sso.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly sso: SsoService,
    private readonly users: UsersService,
  ) {}

  login(username: string, password: string) {
    return this.sso.login(username, password).pipe(
      tap(me => this.users.create(me)),
      map((me: User) => ({
        access_token: signUser(me),
      })),
    );
  }
}
