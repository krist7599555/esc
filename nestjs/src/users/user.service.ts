import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { users } from '../db';
import { RDatum } from 'rethinkdb-ts';

enum Permission {
  rooms = 'rooms',
  announce = 'announce',
}

@Injectable()
export class UserService {
  mini_fields = ['id', 'nameTH', 'surnameTH', 'phone']
  constructor() {}

  index() {
    return users.run();
  }
  show(id: string) {
    return users.get(id).run();
  }
  exist(id: string) {
    return users.getAll(id).count().eq(1).run();
  }
  insert(user: User) {
    return users.insert(user, { returnChanges: true }).run();
  }
  upsert(user: User) {
    return users.insert(user, { returnChanges: true, conflict: 'update' }).run();
  }
  roles(id: string, role: string) {
    return users.get(id)('roles').default([]).contains(role).run();
  }

}