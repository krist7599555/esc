import { IsString, Length, IsNumber, IsNumberString, Min, Max, IsOptional, IsIn, ArrayUnique } from 'class-validator';

export const ROLE_ROOM_APPROVER = 'room_approver';
export const UserRoles = [ROLE_ROOM_APPROVER];
export class User {

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

  @ArrayUnique()
  @IsIn(UserRoles, { each: true })
  roles: string[];
}