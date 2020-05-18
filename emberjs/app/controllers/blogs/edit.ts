import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service, Registry as Services } from '@ember/service';
import Blog from '../../models/blog';

export default class BlogsEdit extends Controller {
  @service toast: Services["toast"]
  @tracked model: Blog;
  @action
  patch() {
    this.model.save()
    .then((blog: Blog) => {
      this.toast.success("save success");
      this.transitionToRoute('blogs.show', blog);
    })
    .catch((err: any) => {
      this.toast.error("edit blogs fail");
      console.error("BlogsEdit -> submit -> err", err)
    })
  }
  @action
  remove() {
    this.model.deleteRecord();
    this.model.save()
    .then(() => {
      this.toast.success("delete success");
      this.transitionToRoute('blogs.index');
    })
    .catch(() => {
      this.toast.error("delete fail");
    })
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'blogs/edit': BlogsEdit;
  }
}
