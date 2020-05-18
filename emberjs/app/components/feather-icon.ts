import Component from '@glimmer/component';
import * as feather from "feather-icons"
import { action } from '@ember/object';
import $ from 'jquery'

interface FeatherIconArgs extends feather.FeatherAttributes {
  icon: string;
  class: string;
  color: string;
  width: number;
  height: number;
  'stroke-width': number;
  'stroke-linecap': any;
  'stroke-linejoin': any;
}

export default class FeatherIcon extends Component<FeatherIconArgs> {
  @action
  mounted(el: HTMLSpanElement) {
    const svg = feather.icons[this.args.icon].toSvg(this.args);
    $(el).replaceWith(svg);
  }
}
