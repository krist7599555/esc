import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { flatMap, map, tap } from 'rxjs/operators';
import { iif, of, zip } from 'rxjs';
import { BcryptService } from './bcrypt.service';
import { EnglibraryService } from '@esc/englibrary/englibrary.service';
import { JwtService } from './jwt.service';
import { SsoService } from '@esc/sso/sso.service';
import { UsersService } from '../store/users/users.service';


@Controller('api')
export class AuthController {

  constructor(private sso:    SsoService,
              private englib: EnglibraryService,
              private jwt: JwtService,
              private users:  UsersService,
              private bcrypt: BcryptService) { }

  @Post('login')
  async login(@Body() cred: { username: string; password: string }) {
    return of(cred.username).pipe(
      tap(user_id => {
        if (!/^[0-9]{10}$/.test(user_id))
          throw new HttpException('username must be 10 digit student id', 400);
      }),
      flatMap(user_id => this.users.find(user_id)),
      flatMap(user =>
        iif(() => user && this.bcrypt.equal(cred.password, user.password),
          of(user),
          zip(
            this.sso.login(cred.username, cred.password),
            this.englib.get(cred.username)
          ).pipe(
            flatMap(([s, e]) => this.users.upsert({ ...s, ...e, password: this.bcrypt.hash(cred.password) })),
            flatMap(() => this.users.find(cred.username))
          )
        )
      ),
      map(user => ({
        profile:      user,
        access_token: this.jwt.sign({}, {
          subject:   user.id,
          expiresIn: '2 days',
        }),
      }))
    );
  }

}
