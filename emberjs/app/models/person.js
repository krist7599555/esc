import Model, { attr } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr nameTH;
  @attr nameEN;
  @attr studentId;
}
