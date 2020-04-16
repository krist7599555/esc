import { IsString, IsDate, IsIn, IsDateString, IsNotEmpty } from 'class-validator';
import { transformAndValidateSync } from 'class-transformer-validator';
import { Transform } from 'class-transformer';



export class Reservation {

  static validate(value: Reservation) {
    return transformAndValidateSync(Reservation, value);
  }

  @IsString() id?: string;

  @IsString() userid: string;
  @IsString() roomid: string;

  @IsDate() time_start: Date;
  @IsDate() time_end: Date;

  @IsIn(['rejected', 'pending', 'approved'])
  status: string;
}

export class CreateReservationDto {
  @IsNotEmpty()
  @IsDateString()
  @Transform(date => new Date(date))
  @IsDate()
  time_start: Date;

  @IsNotEmpty()
  @IsDateString()
  @Transform(date => new Date(date))
  @IsDate()
  time_end: Date;
}