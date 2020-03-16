import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {

  salt = bcrypt.genSaltSync()

  hash(text: string) {
    return bcrypt.hashSync(text, this.salt);
  }

  equal(text: string, hash: string) {
    return bcrypt.compareSync(text, hash);
  }

}