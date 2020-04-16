import { IsString, Length, MinLength, IsNumberString, IsNotEmpty } from 'class-validator';

export class LoginCredential {

  @IsNumberString()
  @Length(10)
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}