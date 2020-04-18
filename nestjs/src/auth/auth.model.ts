import { IsString, Length, IsNumberString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginCredential {

  @ApiProperty()
  @IsNumberString()
  @Length(10)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}