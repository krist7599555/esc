import * as _ from 'lodash';
import { ValidationError } from 'class-validator';
import { HttpException } from '@nestjs/common';

export class ValidationException extends HttpException {
  validate: Record<string, string[]> = {};
  constructor(errs: ValidationError[], status = 400) {
    super('validation error', status);
    this.validate = _(errs)
      .map(err => ({ [err.property]: _.values(err.constraints) }))
      .thru(arr => _.assign({}, ...arr))
      .value();
  }
}