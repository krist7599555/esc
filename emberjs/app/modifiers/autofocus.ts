import { modifier } from 'ember-modifier';

export default modifier(function autofocus(element: HTMLElement/*, params, hash*/) {
  element.focus();
});
