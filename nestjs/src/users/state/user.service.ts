import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { StoreService } from '../../store/store.service';

@Injectable()
export class UserService {
  conn  = this.store.conn;
  users = this.store.users;
  constructor(private store: StoreService) { }

  insert(user: User) {
    return this.users.insert(user, {returnChanges: true}).run(this.conn);
  }
  upsert(user: User) {
    return this.users.insert(user, {returnChanges: true, conflict: 'update'}).run(this.conn);
  }
}