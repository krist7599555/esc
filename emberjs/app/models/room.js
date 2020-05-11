import Model, { attr } from '@ember-data/model';

export default class RoomModel extends Model {
  @attr('string') label;
  @attr('number') capacity;
}
