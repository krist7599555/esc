import * as jwt from 'jsonwebtoken';

import { createParamDecorator, UnauthorizedException } from '@nestjs/common';

import config from '../config';
import { User } from '../users/user.interface';

export interface JwtPayload {
  iat: number;
  exp: number;
  iss: string; // esc chula
  sub: string; // student iu
}

const JWT_REGEX = /^Bearer .+\..+\..+$/;
export const Jwt = createParamDecorator((data, req) => {
  const authToken = req.headers.authorization;
  if (JWT_REGEX.test(authToken)) {
    const jwtToken = authToken.split(' ')[1];
    try {
      return jwt.verify(jwtToken, config().jwt.secret);
    } catch (e) {
      throw new UnauthorizedException('Token is expired. please re-login');
    }
  } else {
    throw new UnauthorizedException('Not login');
  }
});

export const signUser = (user: User) =>
  jwt.sign({}, config().jwt.secret, {
    issuer: 'esc.chula',
    subject: user.id,
    expiresIn: '1h',
  } as jwt.SignOptions);
