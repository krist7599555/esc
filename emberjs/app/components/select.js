import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SelectComponent extends Component {
  @action emit(event) {
    this.args.onChange(event.target.value)
  }
  @action mounted(elem) {
    elem.value = this.args.value; // first biding value
  }
}
