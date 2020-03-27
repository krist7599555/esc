import { IsString, Length, IsNumber, IsNumberString, Min, Max, IsOptional } from 'class-validator';
import { transformAndValidateSync } from 'class-transformer-validator';

export class User {

  static validate(value: User) {
    return transformAndValidateSync(User, value);
  }

  @IsString()
  @Length(10) id: string;

  @IsString() password: string;

  @IsString() nameTH: string;
  @IsString() nameEN: string;
  @IsString() surnameTH: string;
  @IsString() surnameEN: string;

  @IsOptional()
  @IsString() department: string

  @IsOptional()
  @IsString() email: string;

  @IsOptional()
  @IsNumberString()
  @Length(10) phone: string;


  @IsNumber()
  @Min(21)
  @Max(80) faculty: number

  @IsNumber()
  @Min(50)
  @Max(80) year: number
}