import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { HttpException, createParamDecorator, ExecutionContext, InternalServerErrorException, Headers } from '@nestjs/common';

export function jwtSign(payload: { id: string }, opt: jwt.SignOptions = { expiresIn: '2 days' }) {
  return jwt.sign(payload, JWT_SECRET, opt);
}
export function jwtVerify(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtUser;
}

export const JwtDecode = createParamDecorator((field: keyof JwtUser, ctx: ExecutionContext) => {
  try {
    const request = ctx.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) throw new HttpException('process require login, authorization header is empty', 401);
    const token = authorization.split(' ')[1];
    const decode = jwtVerify(token);
    if (!decode.id) throw new HttpException('process require login, authorization header is in wrong format', 401);

    if (field) {
      if (!decode[field]) throw new InternalServerErrorException(`field ${field} not exist in token`);
      return decode[field];
    } else {
      return decode;
    }
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
