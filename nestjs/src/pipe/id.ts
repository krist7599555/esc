// import { PipeTransform, Injectable, ArgumentMetadata, NotFoundException } from '@nestjs/common';
// import { People } from '../entity/person';

// @Injectable()
// export class PersonIdPipe implements PipeTransform {
//   async transform(value: any, metadata: ArgumentMetadata) {
//     console.log(metadata)
//     if (People.getAll(value).count().eq(1).run()) {
//       return value;
//     } else {
//       throw new NotFoundException("notfound person id")
//     }
//   }
// }