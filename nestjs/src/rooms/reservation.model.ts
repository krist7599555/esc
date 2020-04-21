import { IsString, IsDate, IsIn, IsUUID } from 'class-validator';

export const ReservationStatus = ['rejected', 'pending', 'approved'];

export class  Reservation {
  @IsUUID()   id?:                 string;
  @IsString() user_id:             string;
  @IsString() room_id:             string;
  @IsDate()   time_start:          Date;
  @IsDate()   time_end:            Date;
  @IsDate()   created_time?:       Date;
  @IsString() authorizer_id?:      string;
  @IsDate()   authorizer_time?:    Date;
  @IsIn(ReservationStatus) status: string;
}
