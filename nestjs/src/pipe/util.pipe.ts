import { flatten } from 'lodash';
import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from '@nestjs/common';
@Injectable()
export class OneOfPipe<T> implements PipeTransform {
  list: T[];
  constructor(...args: T[]) {
    this.list = args;
  }
  async transform(value: T, _metadata: ArgumentMetadata) {
    if (flatten(this.list).includes(value)) {
      return value;
    } else {
      throw new BadRequestException(`value ${value} not in ${this.list}`);
    }
  }
}