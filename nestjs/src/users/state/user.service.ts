import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { users } from '../../db';

@Injectable()
export class UserService {
  insert(user: User) {
    return users.insert(user, { returnChanges: true }).run();
  }
  upsert(user: User) {
    return users.insert(user, { returnChanges: true, conflict: 'update' }).run();
  }
}