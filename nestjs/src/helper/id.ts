import { Injectable, PipeTransform, HttpException } from '@nestjs/common';
import { JwtDecode } from '../lib/jwt';
import { People } from '../entity/person';

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

// @Injectable()
// export class RoomIdPipe implements PipeTransform {
//   async transform(id: string, _metadata: ArgumentMetadata) {
//     if (await rooms.getAll(id).count().eq(1).run()) {
//       return id;
//     } else {
//       throw new HttpException('room_id is not exist', 404);
//     }
//   }
// }

// @Injectable()
// export class ReservationIdPipe implements PipeTransform {
//   async transform(id: string, _metadata: ArgumentMetadata) {
//     if (await reservations.getAll(id).count().eq(1).run()) {
//       return id;
//     } else {
//       throw new HttpException('reservation_id is not exist', 404);
//     }
//   }
// }

export const JwtId = () => JwtDecode('id', new PersonPipe('id'));
export const JwtPerson = () => JwtDecode('id', new PersonPipe());