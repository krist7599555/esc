import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginCredential } from './dto/login_credential';
import { UserService } from '../users/user.service';
import { sso } from '../libs/sso';
import { englib } from '../libs/englib';
import * as bcrypt from './bcrypt';
import * as jwt from '../libs/jwt';

@Injectable()
export class AuthService {

  constructor(private user_service: UserService) {}

  async login({ username, password }: LoginCredential) {
    let user = await this.user_service.get_by_student_id(username);
    if (!user) {
      const s = await sso(username, password);
      const e = await englib(username);
      const wr = await this.user_service.insert({ ...s, ...e, password: bcrypt.hash(password), roles: [] });
      user = wr.changes[0].new_val;
    }
    if (!bcrypt.equal(password, user.password)) {
      throw new UnauthorizedException('username or password is wrong');
    }
    return {
      profile:      await this.user_service.show(user.id),
      access_token: jwt.sign({ id: user.id }),
    };
  }
}