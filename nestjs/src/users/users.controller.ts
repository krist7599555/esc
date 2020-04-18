import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtDecode, JwtUser } from '../jwt';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('User')
@ApiBearerAuth()
@Controller('api/users')
export class UsersController {

  constructor(private userService: UserService) { }

  @Get('/')
  index() {
    return this.userService.index();
  }

  @Get('/me')
  me(@JwtDecode() user: JwtUser) {
    return this.userService.show(user.id);
  }

  @Get('/:id')
  show(@Param('id') id: string) {
    return this.userService.show(id);
  }

}
