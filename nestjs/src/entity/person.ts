import { r } from 'rethinkdb-ts'
import { Type, plainToClass, Expose } from "class-transformer"
import { ArrayUnique, Max, Min, IsNumber, IsString, IsIn, IsNumberString } from 'class-validator';

export const ROLE_ADMIN  = 'admin';
export const ROLE_OFFICE = 'office';
export const ROLE_STAFF  = 'staff';
export const ROLE_HR     = 'hr';
export type PersonRole = typeof ROLE_ADMIN | typeof ROLE_HR | typeof ROLE_STAFF | typeof ROLE_OFFICE;
export const PersonRoles: PersonRole[] = [ROLE_ADMIN, ROLE_STAFF, ROLE_OFFICE, ROLE_HR];

export class Person {
  @IsString() id: string;
  @IsNumberString() studentId: string;

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
  @IsIn(PersonRoles, { each: true })
  roles?: string[];
  
  @Expose()
  get facultyTH() {
    return this.faculty + "TH"
  }
  @Expose()
  get facultyEN() {
    return this.faculty + "EN"
  }

  @Type(() => Date) created: Date;
  @Type(() => Date) updated: Date;

  static from(obj: Partial<Person>) {
    return plainToClass(Person, obj, { strategy: "excludeAll" })
  }
  constructor(partial: Partial<Person>) {
    Object.assign(this, partial);
  }
}

export const People = r.table<Person>('people');

// import { IsString, IsNumber, IsNumberString, Min, Max, IsIn, ArrayUnique, isNumberString } from 'class-validator';
// import { IsUserId } from '../decorator/is_user_id';
// import { isString, isNumber } from 'util';

