import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import $ from 'jquery';

class ReservationForm {
  @tracked room_id = "";
  @tracked organization  = "";
  @tracked raw_date  = "";
  @tracked raw_arrival_time  = "";
  @tracked raw_departure_time  = "";

  @action
  serialize() {
    return {
      room: this.room_id,
      organization: this.organization,
      arrival_time: this.raw_date + this.raw_arrival_time,
      departure_time: this.raw_date + this.raw_departure_time,
    }
  }
}

export default class RoomsNewController extends Controller {

  @tracked form = new ReservationForm();
  @tracked form_element;
  @service axios;
  @service toast;

  constructor() {
    super(...arguments);
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
      .then(_data => {
        this.toast.success('success')
      })
      .catch(errs => {
        const root = $(this.form_element)
        root.find('[data-help-property]').empty()
        for (const err of errs) {
          const el = root.find(`[data-help-property=${err.source?.parameter}]`)
          if (el.length && err.source?.parameter && err.detail) {
            el.append("<div>" + err.detail + "</div>")
          } else {
            console.error(err)
            this.toast.error(err.detail || err.type || "some error happen")
          }
        }
      })
  }

  @action
  clear_error_message(field) {
    $(this.form_element).find(`[data-help-property=${field}]`).empty()
  }

}
