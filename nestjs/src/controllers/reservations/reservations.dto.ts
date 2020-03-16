import { IsDate, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ReservationStatus, RESERVATIONS_STATUS } from '../../store/reservations/reservaiton.entity';


export class ReserveDto {
  @IsString() roomid: string;
  @IsString() organization: string;

  // @IsDateString()
  // @Transform(date => new Date(date))
  @IsDate()
  @Type(() => Date)
  time_start: Date;

  // @IsDateString()
  // @Transform(date => new Date(date))
  @IsDate()
  @Type(() => Date)
  time_end: Date;

  // @IsEnum()
  @IsString()
  @IsIn(RESERVATIONS_STATUS as any[])
  status: ReservationStatus
}