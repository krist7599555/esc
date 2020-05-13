import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action, computed } from '@ember/object';
import $ from 'jquery';

class ReservationForm {
  @tracked roomId = "";
  @tracked organization  = "";
  @tracked rawDate  = "";
  @tracked rawTimeStart  = "";
  @tracked rawTimeEnd  = "";
  @computed('roomId', 'organization', 'rawDate', 'rawTimeStart', 'rawTimeEnd')
  get serializeForm() {
    console.log('recomputed')
    return {
      room: this.roomId,
      organization: this.organization,
      startTime: this.rawDate + this.rawTimeStart,
      endTime: this.rawDate + this.rawTimeEnd,
    }
  }
}

export default class RoomsNewController extends Controller {

  @tracked form = new ReservationForm();
  @tracked formElement;
  @service axios;
  @service toast;

  constructor() {
    super(...arguments);
  }

  @action
  submit() {
    console.log(this.form)
    console.log(this.form.serializeForm)
    this.axios.request({
      method: "post",
      url: "/api/reservations",
      data: this.form.serializeForm
    })
      .then(data => {
        console.log(data)
      })
      .catch(errs => {
        const root = $(this.formElement)
        root.find('[data-help-property]').empty()
        for (const err of errs) {
          const el = root.find(`[data-help-property=${err.property}]`)
          if (el.length && err.property && err.detail) {
            el.append(err.detail)
          } else {
            this.toast.error(err.detail || err.type || "some error happen")
          }
        }
      })
  }

}
