import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service, Registry as Services } from '@ember/service'
import Blog from 'emberjs/models/blog';
export default class BlogsNew extends Controller {
  @service toast: Services["toast"];
  @action
  submit() {
    this.model.save()
      .then((data: Blog) => {
        this.toast.success("create success");
        this.transitionToRoute('blogs.show', data);
      })
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'blogs/new': BlogsNew;
  }
}
