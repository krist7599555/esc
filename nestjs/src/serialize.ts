import * as JSONAPISerializer from "jsonapi-serializer"
import { JSONAPIErrorOptions } from "jsonapi-serializer"
import { BadRequestException } from '@nestjs/common';
const { Serializer } = JSONAPISerializer;

export type JsonApiError = JSONAPIErrorOptions
export const PersonSerializer = new Serializer('people', {
  attributes: ['nameTH', 'nameEN', 'faculty', 'facultyTH', 'studentId'],
});
export const RoomSerializer = new Serializer('rooms', {
  attributes: ['label', 'capacity']
})
export const ReservationSerializer = new Serializer('rooms', {
  attributes: ['created', 'updated', 'owner', 'room', 'approver'],
  owner: {
    ref: 'id',
    included: false
  },
  room: {
    ref: 'id',
    included: false
  },
  typeForAttribute(type) {
    if (type == 'owner' || type == 'room') {
      return 'people'
    }
    if (type == 'room') {
      return 'rooms'
    }
  }
})

declare module "jsonapi-serializer" {
  interface SerializerOptions {
    [key: string]: any
  }
}

interface AppMiniError {
  detail: string;
  type: string;
  title?: string;
  code?: number;
  property?: any;
}
export class JsonApiErrors extends BadRequestException {
  constructor(public errors: AppMiniError[]) {
    super();
  }
}