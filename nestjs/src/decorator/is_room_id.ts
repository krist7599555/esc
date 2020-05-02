import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { rooms } from '../db';

@ValidatorConstraint({ async: true })
export class RoomIdExistConstraint implements ValidatorConstraintInterface {
  validate(room_id: any, _args: ValidationArguments) {
    return rooms.getAll(room_id).count().eq(1).run();
  }
  defaultMessage(_args?: ValidationArguments) {
    return 'room_id is not exist';
  }
}

export function IsRoomId(validation_options?: ValidationOptions) {
  return function (object: Record<string, any>, property_name: string) {
    registerDecorator({
      target:       object.constructor,
      propertyName: property_name,
      options:      validation_options,
      constraints:  [],
      validator:    RoomIdExistConstraint,
    });
  };
}