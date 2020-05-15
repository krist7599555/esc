import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SelectComponent extends Component {
  @action emit(event: Event) {
    this.args.onChange(event.target.value)
  }
  @action mounted(elem: HTMLSelectElement) {
    elem.value = this.args.value; // first biding value
  }
}
