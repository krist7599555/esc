import { Injectable } from '@nestjs/common';
import { UserStore } from './user.store';
import { StoreService } from '../../store/store.service';

@Injectable()
export class UserQuery {
  users = this.store.users;
  conn  = this.store.conn;
  mini_fields = ['id', 'nameTH', 'surnameTH', 'phone']
  constructor(private store: StoreService) {}

  all() {
    return this.users.run(this.conn);
  }

  get(id: string) {
    return this.users.get(id).run(this.conn);
  }

  exist(id: string) {
    return this.users.getAll(id).count().eq(1).run(this.conn);
  }

  get_mini(id) {
    return this.users.get(id).pluck(...this.mini_fields).run(this.conn);
  }
}