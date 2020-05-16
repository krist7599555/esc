import { modifier } from 'ember-modifier';
import gsap from 'gsap';

export default modifier(function (element: Element, params: gsap.TweenVars) {
  gsap.from(element, params[0] || {});
});
