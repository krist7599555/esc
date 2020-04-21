import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const RoomIds = ['pj2', 'pj3', 'pj4', 'pj5', 'pjesc', 'pjbig'];
export class Room {
  @ApiProperty() @IsString() id:       string;
  @ApiProperty() @IsString() label:    string;
  @ApiProperty() @IsNumber() capacity: number;
}