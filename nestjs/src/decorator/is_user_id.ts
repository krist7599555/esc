import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { users } from '../db';

@ValidatorConstraint({ async: true })
export class UserIdExistConstraint implements ValidatorConstraintInterface {
  validate(user_id: any, _args: ValidationArguments) {
    return users.getAll(user_id).count().eq(1).run();
  }
  defaultMessage(_args?: ValidationArguments) {
    return 'user_id is not exist';
  }
}

export function IsUserId(validation_options?: ValidationOptions) {
  return function (object: Record<string, any>, property_name: string) {
    registerDecorator({
      target:       object.constructor,
      propertyName: property_name,
      options:      validation_options,
      constraints:  [],
      validator:    UserIdExistConstraint,
    });
  };
}