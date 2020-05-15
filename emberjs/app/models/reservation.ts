import Model, { belongsTo, attr } from '@ember-data/model';
import PersonModel from './person';
import RoomModel from './room';

export default class ReservationModel extends Model {
  @belongsTo('room') room   : RoomModel;
  @belongsTo('person') owner: PersonModel;
  @attr      organization   : string;
  @attr      arrival_time   : string;
  @attr      departure_time : string;
  @attr      created        : string;
  @attr      updated        : string;
  @attr      status         : string;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'reservation': ReservationModel;
  }
}
