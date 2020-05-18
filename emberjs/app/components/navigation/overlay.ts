import Component from '@glimmer/component';
import { inject as service, Registry as Services } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { gsap } from 'gsap';
import $ from 'jquery';
import { addObserver } from '@ember/object/observers';
import { easeOut } from 'ember-animated/easings/cosine';

function menu_btn_pos(): { x: number, y: number } {
  const $btn = $("#navigation-item-menu");
  const o = $btn.offset()!;
  const w = $btn.width()!;
  const h = $btn.height()!;
  return { x: o.left + w / 2, y: o.top + h / 2 }
}

export default class NavigationOverlay extends Component<{visible: boolean}> {
  @service router: Services["router"];
  @service auth: Services["auth"];
  @service toast: Services["toast"];

  @action
  to_route(path: string) {
    this.router.transitionTo(path);
  }
  @action
  async logout() {
    this.auth.logout().then(() => {
      this.toast.success('logout success');
      this.router.transitionTo("index");
    })
  }

  @tracked timeline: TimelineMax;

  @action
  mounted(el: HTMLElement) {
    const {x, y} = menu_btn_pos();
    const open  = { clipPath: `circle(170% at ${x}px ${y}px)`, ease: easeOut }
    const close = { clipPath: `circle(0% at ${x}px ${y}px)` };

    const tl = gsap.timeline();
    tl.fromTo(el, 1, close, open);
    tl.from("#navigation-overlay-list > li", { x: 100, opacity: 0, ease: "ease-in", stagger: 0.3, duration: 0.7 }, "-=1.2")

    function anim(stat: boolean) {
      if (stat) {
        tl.duration(1.5).play();
      } else {
        tl.duration(0.7).reverse();
      }
    }

    anim(this.args.visible);
    addObserver(this.args, 'visible', () => anim(this.args.visible))
    this.router.addObserver("currentURL", () => {
      console.log('current url change')
    })
  }

}
