import { UserRoles } from '../users/user.entity';
import { UseGuards } from '@nestjs/common';
import * as _ from 'lodash';
import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from '../libs/jwt';
import { users } from '../db/index';

@Injectable()
export class EscRoleGuard implements CanActivate {
  constructor(private ...roles: string[]) {
  }
  async canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
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



export const Roles = (...roles: UserRoles[]) => UseGuards(new EscRoleGuard(...roles));