import { modifier } from 'ember-modifier';
import gsap from 'gsap';

export default modifier(function (element: HTMLElement, params: any[]) {
  gsap.from(element, params[0] || {});
});
