import { IsString, IsDate, IsIn, IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


export class Reservation {

  @IsUUID()   id?: string;

  @IsString() user_id: string;
  @IsString() room_id: string;

  @IsDate() time_start: Date;
  @IsDate() time_end: Date;

  @IsDate() created_time?: Date;

  @IsIn(['rejected', 'pending', 'approved'])
  status: string;

  @IsString() authorizer_id?: string;
  @IsDate()   authorizer_time?: Date;
}

export class CreateReservationDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  organization: string;

  @ApiProperty({ enum: ['pj3', 'pj4', 'pj5', 'pjesc', 'pjbig'] })
  @IsString()
  @IsNotEmpty()
  room_id: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  time_start: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  time_end: Date;

}