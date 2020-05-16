// @ts-ignore-file
import Model, { attr } from '@ember-data/model';

export default class PersonModel extends Model {
  @attr() name_th   : string;
  @attr() name_en   : string;
  @attr() surname_th: string;
  @attr() surname_en: string;
  @attr() student_id: string;
  @attr() faculty   : number;
  @attr() year      : number;
  @attr() department: string;
  @attr() phone     : string;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'person': PersonModel;
  }
}
