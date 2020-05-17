import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service, Registry as Services } from '@ember/service';
import Blog from '../../models/blog';

export default class BlogsEdit extends Controller {
  @service toast: Services["toast"]
  @action
  submit() {
    this.model.save()
      .then((blog: Blog) => {
        this.transitionToRoute('blogs.show', blog);
      })
      .catch((err: any) => {
        this.toast.error("edit blogs fail");
        console.error("BlogsEdit -> submit -> err", err)
      })
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'blogs/edit': BlogsEdit;
  }
}
