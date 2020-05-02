import { IsString, IsDate, IsIn, IsUUID } from 'class-validator';
import { IsUserId } from '../decorator/is_user_id';
import { IsRoomId } from '../decorator/is_room_id';

export const STATUS_REJECTED = 'rejected';
export const STATUS_PENDING = 'pending';
export const STATUS_APPROVED = 'approved';
export const ReservationStatus = [STATUS_PENDING, STATUS_REJECTED, STATUS_APPROVED];

export class  Reservation {
  @IsString() organization:        string;
  @IsUUID()   id:                  string;
  @IsUserId() user_id:             string;
  @IsRoomId() room_id:             string;
  @IsDate()   time_start:          Date;
  @IsDate()   time_end:            Date;
  @IsDate()   created_time?:       Date;
  @IsString() authorizer_id?:      string;
  @IsDate()   authorizer_time?:    Date;
  @IsIn(ReservationStatus) status: string;
}
