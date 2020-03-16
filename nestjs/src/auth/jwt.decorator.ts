import * as jwt from 'jsonwebtoken';
import { HttpException, HttpStatus, createParamDecorator } from '@nestjs/common';
import { config } from '../config';

export const JwtDecode = createParamDecorator((_, request: any) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    return jwt.verify(token, config.jwt_secret);
  } catch {
    throw new HttpException('process require login', HttpStatus.UNAUTHORIZED);
  }
});

export interface JwtUser {
  sub: string;
  exp: string;
}