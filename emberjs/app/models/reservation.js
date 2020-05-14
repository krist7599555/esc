import Model, { belongsTo, attr } from '@ember-data/model';

export default class ReservationModel extends Model {
  @belongsTo('room') room;
  @belongsTo('person') owner;
  @attr organization;
  @attr arrival_time;
  @attr departure_time;
  @attr created;
  @attr updated;
  @attr status;
}
