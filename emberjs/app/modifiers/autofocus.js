import { modifier } from 'ember-modifier';

export default modifier(function autofocus(element/*, params, hash*/) {
  element.focus();
});
