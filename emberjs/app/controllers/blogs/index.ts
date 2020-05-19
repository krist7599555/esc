import Controller from '@ember/controller';
import { inject as service, Registry as Services } from '@ember/service';
import { action } from '@ember/object'
import { gsap } from 'gsap';
import { easeIn } from 'ember-animated/easings/cosine';

export default class BlogsIndex extends Controller {
  @service auth: Services["auth"];
  @action
  mounted_header(el: HTMLElement) {
    const tl = gsap.timeline();
    tl.add('start', 0.5);
    tl.from(el, { opacity: 0, duration: 0.5 }, 'start');
    tl.from(el, { height: window.innerHeight - 32, ease: easeIn }, 'start+=0.7')
    tl.from('#blogs-index-header-create', { autoAlpha: 0, ease: easeIn })
    tl.from('#blogs-index-list', { opacity: 0, ease: easeIn })
    tl.progress(1).progress(0).play();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'blogs/index': BlogsIndex;
  }
}
