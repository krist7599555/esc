import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { users } from '../db';

@Injectable()
export class UserService {
  mini_fields = ['id', 'nameTH', 'surnameTH', 'phone']
  constructor() {}

  index() {
    return users.run();
  }
  show(id: string) {
    return users.get(id).without('password').run();
  }
  get_by_student_id(student_id: string): Promise<User|null> {
    return users.getAll(student_id, { index: 'student_id' }).nth(0).default(null).run();
  }
  exist(id: string) {
    return users.getAll(id).count().eq(1).run();
  }
  insert(user: User) {
    return users.insert(user, { returnChanges: true }).run();
  }
  upsert(user: User) {
    return users.insert({ roles: [], ...user }, { returnChanges: true, conflict: 'update' }).run();
  }
  roles(id: string, role: string) {
    return users.get(id)('roles').default([]).contains(role).run();
  }
  update<T>(id: string, user: T) {
    return users.get(id).update(user).run();
  }

}