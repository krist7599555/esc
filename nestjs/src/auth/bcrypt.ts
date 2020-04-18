import * as bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync();

export function hash(text: string) {
  return bcrypt.hashSync(text, salt);
}

export function equal(text: string, hash: string) {
  return bcrypt.compareSync(text, hash);
}

