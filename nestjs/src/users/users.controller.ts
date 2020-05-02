import { Controller, Get, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RDatum } from 'rethinkdb-ts';
import { User, ROLE_STAFF, ROLE_HR, ROLE_OFFICE, UserRoles } from './user.entity';
import { Roles } from '../guard/roles.guard';
import { UserIdPipe, JwtId } from '../pipe/id.pipe';
import { OneOfPipe } from '../pipe/util.pipe';

@ApiTags('User')
@ApiBearerAuth()
@Controller('api/users')
export class UsersController {

  constructor(private user_service: UserService) { }

  @Get('/')
  @Roles(ROLE_STAFF)
  index() {
    return this.user_service.index();
  }

  @Get('/me')
  me(@JwtId() id: string) {
    return this.user_service.show(id);
  }

  @Get('/:id')
  show(@Param('id', UserIdPipe) id: string) {
    return this.user_service.show(id);
  }

  @Put('/:id/roles/:role')
  @Roles(ROLE_HR, ROLE_STAFF, ROLE_OFFICE)
  insert_role(
    @Param('id', UserIdPipe) id: string,
    @Param('role', new OneOfPipe(UserRoles)) role: string
  ) {
    return this.user_service.update(id, (u: RDatum<User>) => ({
      roles: u('roles').default<string[]>([]).setInsert(role),
    }));
  }

  @Delete('/:id/roles/:role')
  @Roles(ROLE_HR, ROLE_STAFF, ROLE_OFFICE)
  remove_role(
    @Param('id', UserIdPipe) id: string,
    @Param('role', new OneOfPipe(UserRoles)) role: string
  ) {
    return this.user_service.update(id, (usr: RDatum<User>) => ({
      roles: usr('roles').default([]).setDifference([role]),
    }));
  }
}
