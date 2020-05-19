import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service, Registry as Services } from '@ember/service';
import { action } from '@ember/object';
import { toLeft, toRight } from 'ember-animated/transitions/move-over';
import { gsap } from 'gsap';


export default class Navigation extends Component {
  @service auth: Services["auth"];
  @service toast: Services["toast"];
  @service router: Services["router"];
  @tracked show_menu = false;

  constructor(owner: unknown, args: any) {
    super(owner, args);
    this.router.on("routeDidChange", () => {
      this.show_menu = false;
    })
  }

  @action
  rules({ newItems }: any) {
    return newItems[0] ? toRight : toLeft;
  }

  @action
  mounted(el: HTMLElement) {
    const is_mobile = window.innerWidth <= 767;
    const conf = is_mobile ? { y: 100 } : { x: -100 }
    const is_home = this.router.currentURL == "/"
    gsap.from(el, { delay: is_home ? 2.5 : 0.9, ...conf })
  }

  @action
  toggle_menu() {
    this.show_menu = !this.show_menu;
  }
}
