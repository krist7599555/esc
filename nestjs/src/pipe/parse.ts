import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, NotFoundException } from '@nestjs/common';
import { Reservations, Reservation } from '../entity/reservation';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}

@Injectable()
export class ParseReservationPipe implements PipeTransform<string, Promise<Reservation>> {
  async transform(id: string, _metadata: ArgumentMetadata) {
    const res = await Reservations.get(id).run();
    if (!res) throw new NotFoundException("reservation is not found");
    return res;
  }
}
