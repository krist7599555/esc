// @ts-ignore-file
import Model, { attr } from '@ember-data/model';

export default class RoomModel extends Model {
  @attr() label   : string;
  @attr() capacity: number;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'room': RoomModel;
  }
}
