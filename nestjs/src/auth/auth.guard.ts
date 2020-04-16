import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from '../jwt';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor() { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token);
      return !!decode;
    } catch {
      return false;
    }
  }
}
