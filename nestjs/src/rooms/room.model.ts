import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class Room {
  @ApiProperty() @IsString() id:       string;
  @ApiProperty() @IsString() label:    string;
  @ApiProperty() @IsNumber() capacity: number;
}