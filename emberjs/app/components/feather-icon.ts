import Component from '@glimmer/component';
import * as feather from "feather-icons"
// import "feather-icons"

interface FeatherIconArgs {
  icon: string;
}

export default class FeatherIcon extends Component<FeatherIconArgs> {
  mounted(el: HTMLSpanElement) {
    console.log(feather)
    console.log(feather.icons)
    console.log(feather.icons[this.args.icon])
    console.log("FeatherIcon -> mounted -> el", el)
    console.log(feather.icons[this.args.icon].toSvg())
  }
}
