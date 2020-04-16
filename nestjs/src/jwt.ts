import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

export function sign(payload: any, opt: jwt.SignOptions = {}) {
  return jwt.sign(payload, JWT_SECRET, opt);
}
export function verify(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
