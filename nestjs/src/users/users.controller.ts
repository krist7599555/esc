import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './state/user.service';
import { UserQuery } from './state/user.query';
import { JwtDecode, JwtUser } from '../auth/jwt.decorator';


@Controller('api/users')
export class UsersController {

  constructor(private userQuery: UserQuery) { }

  @Get('')
  index() {
    return this.userQuery.all();
  }

  @Get('me')
  me(@JwtDecode() usr: JwtUser) {
    return this.userQuery.get(usr.sub);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.userQuery.get(id);
  }

}
