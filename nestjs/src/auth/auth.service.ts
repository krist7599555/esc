import { Injectable } from '@nestjs/common';
import { LoginCredential } from './dto/login_credential';
import { users } from '../db/index';
import { UserService } from '../users/user.service';
import { sso } from '../libs/sso';
import { englib } from '../libs/englib';
import * as bcrypt from './bcrypt';
import * as jwt from '../libs/jwt';

@Injectable()
export class AuthService {

  constructor(private user_service: UserService) {}

  async login(cred: LoginCredential) {
    const pass = await users.get(cred.username)('password').default(null).run();
    if (!pass || !bcrypt.equal(cred.password, pass)) {
      const s = await sso(cred.username, cred.password);
      const e = await englib(cred.username);
      this.user_service.upsert({ ...s, ...e, password: bcrypt.hash(cred.password) });
    }
    return {
      profile:      await this.user_service.show(cred.username),
      access_token: jwt.sign({ id: cred.username }),
    };
  }
}