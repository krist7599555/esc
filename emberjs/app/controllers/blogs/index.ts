import Controller from '@ember/controller';
import { inject as service, Registry as Services } from '@ember/service';

export default class BlogsIndex extends Controller {
  @service auth: Services["auth"];
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'blogs/index': BlogsIndex;
  }
}
