import { r } from 'rethinkdb-ts'
import { ArrayUnique, Max, Min, IsNumber, IsString, IsIn, IsNumberString, IsDate } from 'class-validator';

export const ROLE_ADMIN  = 'admin';
export const ROLE_OFFICE = 'office';
export const ROLE_STAFF  = 'staff';
export const ROLE_HR     = 'hr';
export type PersonRole = typeof ROLE_ADMIN | typeof ROLE_HR | typeof ROLE_STAFF | typeof ROLE_OFFICE;
export const PersonRoles: PersonRole[] = [ROLE_ADMIN, ROLE_STAFF, ROLE_OFFICE, ROLE_HR];

export class Person {
  @IsString() id: string;
  @IsNumberString() student_id: string;

  @IsString() password: string;

  @IsString() name_th: string;
  @IsString() name_en: string;
  @IsString() surname_th: string;
  @IsString() surname_en: string;

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
  @IsIn(PersonRoles, { each: true })
  roles?: string[];

  @IsDate() created: Date;
  @IsDate() updated: Date;
}

export const People = r.table<Person>('people');

