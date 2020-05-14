import { HttpException } from '@nestjs/common';
import * as _ from 'lodash';
import { ValidationError } from 'class-validator';

export interface ApiError {
  status?: number;
  title?: string;
  detail: string;
  source?: {
    parameter?: string;
  }
};

export class ApiErrors extends HttpException {
  errors: ApiError[];
  constructor(errs: ApiError[]) {
    super("Bad Request Error", 400);
    this.errors = errs;
  }
  static fromClassValidatorErrors(errors: ValidationError[]) {
    const api_errors = new ApiErrors([]);
    for (const verr of errors) {
      for (const reason of _.values(verr.constraints)) {
        api_errors.errors.push({
          status: 400,
          title: "Bad Request",
          detail: reason,
          source: {
            parameter: verr.property
          }
        })
      }
    }
    return api_errors;
  }
  
}