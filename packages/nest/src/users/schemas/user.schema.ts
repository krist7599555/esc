import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    _id: String,
    gender: String,
    nameTH: String,
    surnameTH: String,
    nameEN: String,
    surnameEN: String,
    year: Number,
    faculty: Number,
    email: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);
