import Route from '@ember/routing/route';

export default class BlogsIndex extends Route {
  model() {
    return this.store.findAll('blog');
  }
}
