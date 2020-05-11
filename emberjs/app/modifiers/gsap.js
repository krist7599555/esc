import { modifier } from 'ember-modifier';
import gsap from 'gsap';

export default modifier(function (element, params) {
  gsap.from(element, params[0] || {});
});
