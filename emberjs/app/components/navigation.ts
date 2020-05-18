import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service, Registry as Services } from '@ember/service';
import { action } from '@ember/object';
import { toLeft, toRight } from 'ember-animated/transitions/move-over';
import { gsap } from 'gsap';
import type Sprite from 'ember-animated/-private/sprite';


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
  async logout() {
    this.auth.logout().then(() => {
      this.toast.success('logout success')
    })
  }
  rules({ newItems }: any) {
    if (newItems[0]) {
      return toRight;
    } else {
      return toLeft;
    }
  }

  @action
  mounted(el: HTMLElement) {
    const is_mobile = window.innerWidth <= 767;
    const conf = is_mobile ? { y: 100 } : { x: -100 }
    gsap.from(el, { delay: 0.5, ...conf })
  }

  @action
  toggle_menu() {
    this.show_menu = !this.show_menu;
  }
}
