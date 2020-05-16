// @ts-ignore-file
import Model, { belongsTo, attr } from '@ember-data/model';

export default class ReservationModel extends Model {
  @belongsTo('room') room   : any;
  @belongsTo('person') owner: any;
  @belongsTo('person') approver: any;
  @attr()    organization   : string;
  @attr()    arrival_time   : string;
  @attr()    departure_time : string;
  @attr()    created        : string;
  @attr()    updated        : string;
  @attr()    status         : string;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'reservation': ReservationModel;
  }
}
