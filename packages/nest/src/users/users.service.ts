import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly users: Model<User>,
  ) {}

  create(user: User) {
    return this.users.findByIdAndUpdate(user._id, user, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  findAll() {
    return this.users.find().exec();
  }

  findById(id: string) {
    return this.users.findById(id);
  }
}
