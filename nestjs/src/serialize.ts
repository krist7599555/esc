import { Person } from './entity/person';
import { Room } from './entity/room';
import { isArray } from 'lodash'
import { Reservation } from './entity/reservation';
import * as dayjs from 'dayjs'
import "dayjs/locale/th";
import { Blog } from './entity/blog';
dayjs.locale('th');
import JSONAPISerializer = require("json-api-serializer");

export const Serializer = new JSONAPISerializer({
  convertCase: 'kebab-case',
  jsonapiObject: true,
  blacklistOnDeserialize: ["created", "inserted"]
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
    if (isArray(data)) {
      return { length: data.length, ...extra };
    } else {
      return extra
    }
  },
});

Serializer.register("rooms", {
  id: "id",
  links: {
    self(data: Room) {
      return "/rooms/" + data.id;
    }
  },
  topLevelMeta(data: any, ext: any) {
    if (isArray(data)) {
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
    self: function(data: Reservation) {
      return "/reservations/" + data.id;
    }
  },
  relationships: {
    room: { type: "rooms" },
    owner: { type: "people", },
    approver: { type: "people" },
  },
  beforeSerialize(data: any) {
    data.created = dayjs(data.created).format();
    data.updated = dayjs(data.updated).format();
    data.arrival_time = dayjs(data.arrival_time).format();
    data.departure_time = dayjs(data.departure_time).format();
    return data;
  },
  topLevelMeta(data: any, ext: any) {
    if (isArray(data)) ext.length = data.length
    return ext
  },
})

Serializer.register('blogs', {
  id: 'id',
  relationships: {
    author: { type: "people" }
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
export function serialize_blogs<T = Partial<Blog>>(data: T|T[], extra?: any) {
  return Serializer.serialize('blogs', data, extra);
}