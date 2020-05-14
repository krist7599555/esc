import { Injectable, CanActivate, ExecutionContext, UseGuards, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';
import { jwtVerify } from '../lib/jwt';
import { People } from '../entity/person';

@Injectable()
export class RolesGuard implements CanActivate {
  roles: string[];
  constructor(..._roles: string[]) {
    this.roles = _roles;
  }
  async canActivate(ctx: ExecutionContext) {
    const req: Request = ctx.switchToHttp().getRequest();
    const usr = jwtVerify(req.headers["authorization"].split(" ")[1]);
    const roles = await People.get(usr.id)('roles').default([]).run();
    for (const role of roles) {
      if (this.roles.includes(role)) return true;
    }
    throw new ForbiddenException(`require roles '${this.roles}' to continue process`);
    return false;
  }
}

export const Roles = (...rest: string[]) => UseGuards(new RolesGuard(...rest));
