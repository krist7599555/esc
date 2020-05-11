import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class RequirePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // console.log({value})
    // console.log("RequirePipe -> transform -> metadata", metadata)
    // console.log("RequirePipe -> transform -> metadata", metadata.metatype === String)
    if (!value) {
      throw new BadRequestException(`${metadata.data} is require`);
    }
    return value;
  }
}