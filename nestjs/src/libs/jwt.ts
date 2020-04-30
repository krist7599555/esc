import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { HttpException, createParamDecorator, ExecutionContext } from '@nestjs/common';

export function sign(payload: { id: string }, opt: jwt.SignOptions = { expiresIn: '2 days' }) {
  return jwt.sign(payload, JWT_SECRET, opt);
}
export function verify(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtUser;
}


export const JwtDecode = createParamDecorator((_, ctx: ExecutionContext) => {
  try {
    const request = ctx.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) throw new HttpException('process require login, authorization header is empty', 401);
    const token = authorization.split(' ')[1];
    const res = verify(token);
    if (!res.id) throw new HttpException('process require login, authorization header is in wrong format', 401);
    return res;
  } catch(e) {
    if (e instanceof HttpException) throw e;
    else throw new HttpException('process require login', 401);
  }
});

export interface JwtUser {
  id:  string;
  exp: number | string;
  iat?: number;
}
