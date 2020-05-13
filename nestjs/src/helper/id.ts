import { ArgumentMetadata, Injectable, PipeTransform, HttpException } from '@nestjs/common';
import { JwtDecode } from '../lib/jwt';
import { People } from '../entity/person';

@Injectable()
export class PersonIdPipe implements PipeTransform {
  async transform(id: string, _metadata: ArgumentMetadata) {
    if (await People.getAll(id).count().eq(1).run()) {
      return id;
    } else {
      throw new HttpException('user_id is not exist', 404);
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

export const JwtId = () => JwtDecode('id', new PersonIdPipe());