import { Controller, Get, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtDecode, JwtUser } from '../libs/jwt';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RDatum } from 'rethinkdb-ts';
import { User } from './user.model';

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

  @Put('/:id/roles/:role')
  // TODO @AuthGuard('admin')
  insert_role(@Param('id') id: string, @Param('role') role: string) {
    return this.userService.update(id, (u: RDatum<User>) => ({
      roles: u('roles').default<string[]>([]).setInsert(role),
    }));
  }

  @Delete('/:id/roles/:role')
  // TODO @AuthGuard('admin')
  remove_role(@Param('id') id: string, @Param('role') role: string) {
    return this.userService.update(id, (usr: RDatum<User>) => ({
      roles: usr('roles').default([]).setDifference([role]),
    }));
  }
}
