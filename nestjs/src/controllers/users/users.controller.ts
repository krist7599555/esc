import { Controller, Get } from '@nestjs/common';
import { JwtDecode, JwtUser } from 'src/auth/jwt.decorator';
import { UsersService } from '../../store/users/users.service';

@Controller('api/users')
export class UsersController {

  constructor(private users: UsersService) {}

  @Get('')
  index() {
    // TODO
    return 'USERS';
  }

  @Get('me')
  profile(@JwtDecode() usr: JwtUser) {
    return this.users.find(usr.sub);
  }
  
  @Get(':id')
  show() {
    // TODO
    return 'USER';
  }
  
}
