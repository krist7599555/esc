import Model, { attr } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr name_th;
  @attr name_en;
  @attr surname_th;
  @attr surname_en;
  @attr student_id;
  @attr faculty;
  @attr year;
  @attr department;
  @attr phone;
}
