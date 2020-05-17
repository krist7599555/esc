import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service, Registry as Services } from '@ember/service';

export default class BlogsEdit extends Controller {
  @service toast: Services["toast"]
  @action
  submit() {
    this.model.save()
      .then((blog: Blog) => {
        this.transitionToRoute('blogs.show', blog);
      })
      .catch((err) => {
        this.toast.error("edit blogs fail");
      })
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'blogs/edit': BlogsEdit;
  }
}
