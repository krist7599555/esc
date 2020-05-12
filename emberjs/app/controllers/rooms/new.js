import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
// import { action } from '@ember/object';
// import { set } from '@ember/object';

export default class RoomsNewController extends Controller {
  @tracked roomId = "";
  @tracked organization = "";
  @tracked roomsOptions = [
    { value: "pj2", label: "ห้องประชุม 2" },
    { value: "pj3", label: "ห้องประชุม 3" },
    { value: "pj4", label: "ห้องประชุม 4" },
  ]

  // @action
  // setForm(field, event, e) {
  //   console.log([field, event, e])
  //   set(this.form, field, event.target.value);
  // }
  // @action
  // event_setter() {
  //   console.log('event setter', arguments)
  // }

}
