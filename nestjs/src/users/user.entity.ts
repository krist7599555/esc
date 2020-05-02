import { IsString, IsNumber, IsNumberString, Min, Max, IsIn, ArrayUnique } from 'class-validator';
import { IsUserId } from '../decorator/is_user_id';

export const ROLE_ADMIN = 'admin';
export const ROLE_OFFICE = 'office';
export const ROLE_STAFF = 'staff';
export const ROLE_HR = 'hr';
export const UserRoles = [ROLE_ADMIN, ROLE_STAFF, ROLE_OFFICE, ROLE_HR];
export class User {

  @IsUserId() id: string;
  @IsNumberString() student_id: string;

  @IsString() password: string;

  @IsString() nameTH: string;
  @IsString() nameEN: string;
  @IsString() surnameTH: string;
  @IsString() surnameEN: string;

  @IsString() department: string
  @IsString() email: string;
  @IsString() phone: string;

  @IsNumber()
  @Min(21)
  @Max(80) faculty: number

  @IsNumber()
  @Min(50)
  @Max(80) year: number

  @ArrayUnique()
  @IsIn(UserRoles, { each: true })
  roles?: string[];
}