import Component from '@glimmer/component';
import * as feather from "feather-icons"
import { action } from '@ember/object';
import $ from 'jquery'
interface FeatherIconArgs {
  icon: string;
  class?: string;
}

export default class FeatherIcon extends Component<FeatherIconArgs> {
  @action
  mounted(el: HTMLSpanElement) {
    console.log("FeatherIcon -> mounted -> this.args.class", this.args.class)
    const svg = feather.icons[this.args.icon].toSvg({
      class: this.args.class
    });
    $(el).replaceWith(svg);
  }
}
