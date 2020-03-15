import { Controller, Post, Body } from '@nestjs/common';
import { SsoService } from '@esc/sso/sso.service';
import { EnglibraryService } from '@esc/englibrary/englibrary.service';
import { zip } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { UsersService } from '../store/users/users.service';

@Controller('auth')
export class AuthController {

  constructor(private sso:    SsoService,
              private englib: EnglibraryService,
              private users:  UsersService) { }

  @Post('login')
  async login(@Body() cred: { username: string; password: string }) {
    if (!/^\d{10}$/.test(cred.username)) {
      throw new Error('username is wrong format');
    } 
    return zip(
      this.sso.login(cred.username, cred.password),
      this.englib.get(cred.username)
    ).pipe(
      flatMap(([s, e]) => this.users.create({...s, ...e}))
    );
  }

}
