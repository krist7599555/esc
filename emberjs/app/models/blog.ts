import Model, { attr, belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';
import * as marked from 'marked';
import { htmlSafe } from '@ember/template';

export default class Blog extends Model {
  @attr({ defaultValue: "" }) title:    string;
  @attr({ defaultValue: "" }) markdown: string;
  @attr() created:  string;
  @attr() updated:  string;
  @belongsTo('person') author: any;
  @computed('markdown')
  get html() {
    return htmlSafe(marked(this.markdown));
  }
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'blog': Blog;
  }
}
