import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  findAll() {
    return this.users.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const user = await this.users.findById(id);
    if (!user) throw new NotFoundException(`user id ${id} not exist`);
    return user;
  }
}
