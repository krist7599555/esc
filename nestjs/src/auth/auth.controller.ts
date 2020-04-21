import * as bcrypt from './bcrypt';
import { Body, Controller, Post } from '@nestjs/common';
import { flatMap, map } from 'rxjs/operators';
import { iif, of, zip, from } from 'rxjs';
import { UserService } from '../users/user.service';
import { LoginCredential } from './auth.model';
import { EnglibraryService } from '../../libs/englibrary/src/englibrary.service';
import * as jwt from '../libs/jwt';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import * as sso from '../libs/sso';

@ApiTags('Auth')
@Controller('api')
export class AuthController {

  constructor(private englib: EnglibraryService,
              private userService:  UserService,
  ) { }

  @ApiBody({ type: LoginCredential })
  @Post('/login')
  async login(@Body() cred: LoginCredential) {
    return of(cred.username).pipe(
      flatMap(id => from(this.userService.show(id))),
      flatMap(user =>
        iif(() => user && bcrypt.equal(cred.password, user.password),
          of({ user, cache: true }),
          zip(
            sso.login(cred.username, cred.password),
            this.englib.get(cred.username)
          ).pipe(
            map    (([s, e]) => ({ ...s, ...e, roles: [], password: bcrypt.hash(cred.password) })),
            flatMap(user => this.userService.upsert(user)),
            flatMap(()   => this.userService.show(cred.username)),
            map    (user => ({ user, cache: false }))
          )
        )
      ),
      map(({ user, cache }) => ({
        cache,
        profile:      user,
        access_token: jwt.sign({ id: user.id }),
      }))
    ).toPromise();
  }

}
