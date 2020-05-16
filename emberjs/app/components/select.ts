import Component from '@glimmer/component';
import { action } from '@ember/object';

interface SelectComponentArgument {
  value: string;
  onChange(value: string): void;
}

export default class SelectComponent extends Component<SelectComponentArgument> {
  @action emit(event: KeyboardEvent) {
    this.args.onChange((event.target as HTMLSelectElement).value)
  }
  @action mounted(elem: HTMLSelectElement) {
    elem.value = this.args.value;
  }
}
