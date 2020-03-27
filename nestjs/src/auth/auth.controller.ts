import { Body, Controller, Post } from '@nestjs/common';
import { flatMap, map } from 'rxjs/operators';
import { iif, of, zip, from } from 'rxjs';
import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';
import { SsoService } from '@esc/sso/sso.service';
import { UserService } from '../users/state/user.service';
import { UserQuery } from '../users/state/user.query';
import { LoginCredential } from './auth.model';
import { User } from 'src/users/state/user.model';
import { EnglibraryService } from '../../libs/englibrary/src/englibrary.service';


@Controller('api')
export class AuthController {

  constructor(private sso:    SsoService,
              private englib: EnglibraryService,
              private jwt: JwtService,
              private bcrypt: BcryptService,
              private userQuery:  UserQuery,
              private userService:  UserService,
  ) { }

  @Post('login')
  async login(@Body() cred: LoginCredential) {
    return of(cred.username).pipe(
      flatMap(id => from(this.userQuery.get(id))),
      flatMap(user =>
        iif(() => user && this.bcrypt.equal(cred.password, user.password),
          of({ user, cache: true }),
          zip(
            this.sso.login(cred.username, cred.password),
            this.englib.get(cred.username)
          ).pipe(
            map    (([s, e]) => ({ ...s, ...e, password: this.bcrypt.hash(cred.password) })),
            map    (user => User.validate(user)),
            flatMap(user => this.userService.upsert(user)),
            flatMap(()   => this.userQuery.get(cred.username)),
            map    (user => ({ user, cache: false }))
          )
        )
      ),
      map(({ user, cache }) => ({
        cache,
        profile:      user,
        access_token: this.jwt.sign({}, {
          subject:   user.id,
          expiresIn: '2 days',
        }),
      }))
    );
  }

}
