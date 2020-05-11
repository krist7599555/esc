import * as bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync();

export function bcryptHash(text: string) {
  return bcrypt.hashSync(text, salt);
}

export function bcryptEqual(text: string, hash: string) {
  return bcrypt.compareSync(text, hash);
}

