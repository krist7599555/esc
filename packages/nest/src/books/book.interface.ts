import { Document } from 'mongoose';

export type BookStatus = 'approved' | 'waiting' | 'rejected';
export type BookRoom = string;

export interface BookDto {
  project: string;
  organization: string;
  description?: string;

  date: string;
  start: string;
  end: string;
  room: BookRoom;
}

export interface Book extends BookDto, Document {
  status: BookStatus;
  owner: string;
  editor?: string;
}
