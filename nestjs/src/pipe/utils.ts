import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

export class OneOf<T> implements PipeTransform<T, T> {
  constructor(public readonly arr: T[]) {
  }
  transform(value: T, meta: ArgumentMetadata) {
    if (this.arr.includes(value)) {
      return value
    } else {
      throw new BadRequestException(`value ${meta.data} must be member of ${this.arr}`)
    }
  }
}