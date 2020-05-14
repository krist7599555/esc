import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import dayjs from 'dayjs';
import $ from 'jquery';

class ReservationForm {
  @tracked room_id = "";
  @tracked organization  = "";
  @tracked raw_date  = "";
  @tracked raw_arrival_time  = "";
  @tracked raw_departure_time  = "";

  @action
  serialize() {
    const t1 = dayjs(this.raw_arrival_time);
    const t2 = dayjs(this.raw_departure_time);
    const nw = dayjs(this.raw_date);
    return {
      room:           this.room_id,
      organization:   this.organization,
      arrival_time:   nw.hour(t1.hour()).minute(t1.minute()).format(),
      departure_time: nw.hour(t2.hour()).minute(t2.minute()).format(),
    }
  }
}

export default class RoomsNewController extends Controller {

  @tracked form = new ReservationForm();
  @tracked $form_element;
  @service axios;
  @service toast;

  constructor() {
    super(...arguments);
  }

  @action
  set_form_element(el) {
    this.$form_element = $(el);
  }

  @action
  submit() {
    console.log(this.form)
    console.log(this.form.serialize())
    this.axios.request({
      method: "post",
      url: "/api/reservations",
      data: this.form.serialize()
    })
      .then(o => {
        this.toast.success('success')
        this.transitionToRoute('rooms.show', { room_id: o.data.id });
      })
      .catch(o => {
      console.log("RoomsNewController -> submit -> o", o)
        this.$form_element.find('[data-help-property]').empty()
        for (const err of o.errors) {
          const err_msg_el = this.$form_element.find(`[data-help-property=${err.source?.parameter}]`)
          if (err_msg_el.length && err.source?.parameter && err.detail) {
            err_msg_el.append("<div>" + err.detail + "</div>")
          } else {
            console.error(err)
            this.toast.error(err.detail || err.type || "some error happen")
          }
        }
      })
  }

  @action
  clear_error_message(field) {
    this.$form_element.find(`[data-help-property=${field}]`).empty()
  }

}
