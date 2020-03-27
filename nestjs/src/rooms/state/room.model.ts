import { IsString, IsNumber } from 'class-validator';
import { transformAndValidateSync } from 'class-transformer-validator';

export class Room {

  static validate(value: Room) {
    return transformAndValidateSync(Room, value);
  }

  @IsString() id: string;

  @IsString() label: string;
  @IsNumber() capacity: number;
}