import { IsString, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RoomIds } from '../room.entity';
import { IsRoomId } from '../../decorator/is_room_id';

export class CreateReservationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()                   organization: string;

  @ApiProperty({ enum: RoomIds })
  @IsRoomId()
  @IsString()
  @IsNotEmpty()                   room_id: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()                   time_start: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()                   time_end: Date;


}