import { flatten } from 'lodash';
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
@Injectable()
export class OneOfPipe<T> implements PipeTransform {
  constructor(private ...arr: T[]) {}
  async transform(value: T, _metadata: ArgumentMetadata) {
    if (flatten(this.arr).includes(value)) {
      return value;
    } else {
      throw new BadRequestException(`value ${value} not in ${this.arr}`);
    }
  }
}