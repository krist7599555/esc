import { Person } from './entity/person';
import { Room } from './entity/room';
import * as _ from 'lodash'
import { Reservation } from './entity/reservations';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const JSONAPISerializer = require("json-api-serializer");
const Serializer = new JSONAPISerializer({
  convertCase: 'snake_case',
  // unconvertCase: 'snake_case',
  jsonapiObject: true,
  // convertCaseCacheSize: 0
});

Serializer.register('people', {
  id: "id",
  blacklist: ["password"],
  links: {
    self(data: Person) {
      return "/people/" + data.id;
    }
  },
  topLevelMeta: function(data: any, extra: any) {
    if (_.isArray(data)) {
      return { length: data.length, ...extra };
    } else {
      return extra
    }
  },
});

Serializer.register('rooms', {
  id: "id",
  links: {
    self(data: Room) {
      return "/rooms/" + data.id;
    }
  },
  topLevelMeta(data: any, ext: any) {
    if (_.isArray(data)) {
      return { length: data.length, ...ext };
    } else {
      return ext
    }
  },
  meta(_data: any, _ext: any) {
    return {
      location: "ตึก 100 ปี ชั้น 3 คณะวิศวกรรมศาสตร์ จุฬาฯ"
    };
  },
  topLevelLinks(_data: any[]) {
    return {
      self: "/rooms"
    }
  }
});

Serializer.register('reservations', {
  id: "id",
  links: {
    self: function(data: Room) {
      return "/reservations/" + data.id;
    }
  },
  relationships: {
    room: { type: "rooms" },
    owner: { type: "people", },
    approver: { type: "people" },
  }
})

export function serialize_people<T = Partial<Person>>(data: T | T[], extra?: any) {
  return Serializer.serialize('people', data, extra);
}
export function serialize_rooms<T = Partial<Room>>(data: T|T[], extra?: any) {
  return Serializer.serialize('rooms', data, extra);
}
export function serialize_reservations<T = Partial<Reservation>>(data: T|T[], extra?: any) {
  return Serializer.serialize('reservations', data, extra);
}