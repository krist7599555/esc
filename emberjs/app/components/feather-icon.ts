import Component from '@glimmer/component';
import * as feather from "feather-icons"
import { action } from '@ember/object';
import $ from 'jquery'
interface FeatherIconArgs {
  icon: string;
  class?: string;
  'color'?: any;
  'width'?: any;
  'height'?: any;
  'stroke-width'?: any;
  'stroke-linecap'?: any;
  'stroke-linejoin'?: any;
}

export default class FeatherIcon extends Component<FeatherIconArgs> {
  @action
  mounted(el: HTMLSpanElement) {
    console.log("FeatherIcon -> mounted -> this.args.class", this.args.class)
    const svg = feather.icons[this.args.icon].toSvg(this.args);
    $(el).replaceWith(svg);
  }
}
