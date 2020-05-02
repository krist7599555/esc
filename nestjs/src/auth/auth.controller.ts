import { Body, Controller, Post } from '@nestjs/common';
import { LoginCredential } from './dto/login_credential';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('/api')
export class AuthController {

  constructor(private auth:  AuthService) { }

  @ApiBody({ type: LoginCredential })
  @Post('/login')
  async login(@Body() cred: LoginCredential) {
    return this.auth.login(cred);
  }

}
