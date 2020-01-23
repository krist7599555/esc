import { Controller, Get, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Get()
  default() {
    return "AUTH"
  }

  @Get('profile')
  getProfile() {
    return {}
  }

  @Post('login')
  login(@Body() body: any) {
    return this.auth.login(body.username, body.password)
  }
}
