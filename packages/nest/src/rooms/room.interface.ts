import { Document } from 'mongoose';

export type RoomStatus = 'approved' | 'waiting' | 'rejected';
export type RoomBuilding = 'pj3' | 'pj4' | 'pj5' | 'pjesc' | 'pjbig';

export interface RoomDto {
  project: string;
  organization: string;
  description?: string;

  date: string;
  start: string;
  end: string;
  room: RoomBuilding;
}

export interface Room extends RoomDto, Document {
  status: RoomStatus;
  owner: string;
  editor?: string;
}

export interface RoomBuildingDetail {
  room: RoomBuilding;
  label: string;
  capacity?: number;
}
export interface RoomStatusDetail {
  status: RoomStatus;
  label: string;
}
