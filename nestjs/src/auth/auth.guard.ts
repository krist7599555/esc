import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization.split(' ')[1];
      const decode = this.jwtService.verify(token);
      return !!decode;
    } catch {
      return false;
    }
  }
}
