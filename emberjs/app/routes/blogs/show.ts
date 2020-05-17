import Route from '@ember/routing/route';

interface Param {
  blog_id: string;
}

export default class BlogsShow extends Route {
  model({ blog_id }: Param) {
    return this.store.findRecord('blog', blog_id);
  }
}
