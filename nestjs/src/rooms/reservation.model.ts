import { IsString, IsDate, IsIn, IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RoomIds } from './room.model';

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

export class CreateReservationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()                   organization: string;

  @ApiProperty({ enum: RoomIds })
  @IsString()
  @IsNotEmpty()
  @IsIn(RoomIds)                  room_id: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()                   time_start: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()                   time_end: Date;

}