import { IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';


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
}