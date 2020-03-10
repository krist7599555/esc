import * as mongoose from 'mongoose';
import { User } from './user.interface';

export const UserSchema = new mongoose.Schema<User>(
  {
    _id: { type: String, validate: /^\d{10}$/ },
    gender: { type: String, enum: ['male', 'female'] },
    nameTH: String,
    surnameTH: String,
    nameEN: String,
    surnameEN: String,
    year: Number,
    faculty: Number,
    email: String,

    nickname: String,
    roles: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);
