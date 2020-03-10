import { Body, Controller, Get, Post } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Jwt, JwtPayload } from '../utils/jwt';

@Controller('api')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly users: UsersService,
  ) {}

  @Get('profile')
  getProfile(@Jwt() jwt: JwtPayload) {
    return this.users.get(jwt.sub);
  }

  @Post('login')
  login(@Body() { username, password }) {
    return this.auth.login(username, password);
  }
}
