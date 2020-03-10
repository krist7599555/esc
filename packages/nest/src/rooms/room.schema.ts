import * as mongoose from 'mongoose';
import { Room } from './room.interface';
import { ROOMS_BUILDING, ROOMS_STATUS } from './constant';

export const RoomSchema = new mongoose.Schema<Room>(
  {
    project: String,
    organization: String,
    description: String,
    date: { type: String, validate: /^\d{4}-\d{2}-\d{2}$/, index: true },
    start: { type: String, validate: /^\d+:[30]0$/ },
    end: { type: String, validate: /^\d+:[30]0$/ },
    room: { type: String, enum: ROOMS_STATUS.map(s => s.status) },
    // status: { type: String, enum: ROOMS_BUILDING.map(r => r.room) },
    owner: { type: String, validate: /^\d{10}$/ },
    editor: { type: String, validate: /^\d{10}$/ },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);
