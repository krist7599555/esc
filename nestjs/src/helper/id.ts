import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { Injectable, PipeTransform, HttpException, ArgumentMetadata } from '@nestjs/common';
import { JwtDecode } from '../lib/jwt';
import { People } from '../entity/person';
import { Reservations } from '../entity/reservation';
import { Rooms } from '../entity/room';

@Injectable()
export class PersonPipe implements PipeTransform {
  constructor(protected field?: string) {}
  async transform(id: string) {
    if (await People.getAll(id).count().eq(1).run()) {
      if (this.field) {
        return People.get(id)(this.field).default(null).run();
      } else {
        return People.get(id).default(null).run();
      }
    } else {
      throw new HttpException('personId is not exist', 404);
    }
  }
}

@Injectable()
export class RoomIdPipe implements PipeTransform {
  async transform(id: string, _metadata: ArgumentMetadata) {
    if (await Rooms.getAll(id).count().eq(1).run()) {
      return id;
    } else {
      throw new HttpException('room_id is not exist', 404);
    }
  }
}

@Injectable()
export class ReservationIdPipe implements PipeTransform {
  async transform(id: string, _metadata: ArgumentMetadata) {
    if (await Reservations.getAll(id).count().eq(1).run()) {
      return id;
    } else {
      throw new HttpException('reservation_id is not exist', 404);
    }
  }
}

export const JwtId = () => JwtDecode('id', new PersonPipe('id'));
export const JwtPerson = () => JwtDecode('id', new PersonPipe());



@ValidatorConstraint({ async: true })
export class IsRoomIdConstraint implements ValidatorConstraintInterface {
  validate(room_id: any, _args: ValidationArguments) {
    return Rooms.getAll(room_id).count().eq(1).run();
  }
}

export function IsRoomId(validationOptions?: ValidationOptions) {
   return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsRoomIdConstraint
        });
   };
}