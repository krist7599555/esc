import { UserRole } from '../users/user.entity';
import { UseGuards } from '@nestjs/common';
import * as _ from 'lodash';
import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import * as jwt from '../libs/jwt';
import { users } from '../db/index';

@Injectable()
export class EscRoleGuard implements CanActivate {
  roles: string[];
  constructor(...roles: string[]) {
    this.roles = roles;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) throw new UnauthorizedException('require login');
    const token = request.headers.authorization.split(' ')[1];
    if (!token) throw new UnauthorizedException('require login');

    let id: string;
    try {
      id = jwt.verify(token).id;
    } catch(e) {
      throw new UnauthorizedException('require login, token is invalid, please re-login');
    }
    const roles = await users.get(id)('roles').default([]).run();
    if (_.some(roles, role => _.includes(this.roles, role))) {
      return true;
    } else {
      throw new ForbiddenException(`require roles [${this.roles}]`);
    }
  }
}



export const Roles = (...roles: UserRole[number][]) => UseGuards(new EscRoleGuard(...roles));