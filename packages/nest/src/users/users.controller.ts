import { Jwt } from 'src/utils/jwt';

import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { JwtPayload } from '../utils/jwt';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  findAll() {
    return this.users.find();
  }

  @Get('me')
  profile(@Jwt() jwtPayload: JwtPayload) {
    return this.users.get(jwtPayload.sub);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.users.get(id);
    if (!user) throw new NotFoundException(`user id ${id} not exist`);
    return user;
  }
}
