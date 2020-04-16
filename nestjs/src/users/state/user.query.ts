import { Injectable } from '@nestjs/common';
import { users } from '../../db';

@Injectable()
export class UserQuery {
  mini_fields = ['id', 'nameTH', 'surnameTH', 'phone']
  constructor() {}

  all() {
    return users.run();
  }

  get(id: string) {
    return users.get(id).run();
  }

  exist(id: string) {
    return users.getAll(id).count().eq(1).run();
  }

  get_mini(id) {
    return users.get(id).pluck(...this.mini_fields).run();
  }
}