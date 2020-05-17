import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UseInterceptors, BadRequestException } from '@nestjs/common';
import { map } from 'rxjs/operators';
import type { Entity } from '@esc'
import { Serializer } from './serialize'
import { Request } from 'express';

@Injectable()
export class JsonApiInterceptor implements NestInterceptor {
  constructor(private readonly collection: keyof Entity) {
  }
  intercept(context: ExecutionContext, next: CallHandler) {
    const req: Request = context.switchToHttp().getRequest();
    if (["POST", "PATCH"].includes(req.method)) {
      if ('data' in req.body) {
        req.body = Serializer.deserialize(this.collection, req.body)
      } else {
        throw new BadRequestException("require json api pattern");
      }
    }
   
    return next
      .handle()
      .pipe(
        map(data => {
          return Serializer.serialize(this.collection, data)
        }),
      );
  }
}

export function JsonApiSerialize(collection: keyof Entity) {
  return UseInterceptors(new JsonApiInterceptor(collection));
}