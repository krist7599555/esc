import Route from '@ember/routing/route';

export default class BlogsNew extends Route {
  model() {
    return this.store.createRecord('blog', {})
  }
}
