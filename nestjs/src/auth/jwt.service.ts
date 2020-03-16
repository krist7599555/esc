import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { config } from '../config';

@Injectable()
export class JwtService {

  sign(payload: any, opt: jwt.SignOptions = {}) {
    return jwt.sign(payload, config.jwt_secret, opt);
  }
  verify(token: string) {
    return jwt.verify(token, config.jwt_secret);
  }
}