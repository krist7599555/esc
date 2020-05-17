import Controller from '@ember/controller';
import { inject as service } from '@ember/service'
export default class BlogsShow extends Controller {
  @service session;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'blogs/show': BlogsShow;
  }
}
