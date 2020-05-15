import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ReservationsShowController extends Controller {

  @tracked RESERVATIONS_STATS = [
    { value: 'pending', label: 'รอตรวจ', class: "warning"},
    { value: 'approved', label: 'อนุมัติ', class: "success"},
    { value: 'rejected', label: 'ปฏิเสท', class: "danger"},
  ]
  @service axios;
  @service toast;

  @action
  change_stats(new_status: string) {
    const id = this.model.reservation.id
    this.axios.request({
      method: "put",
      url: `/api/reservations/${id}/status/${new_status}`
    })
      .then(() => {
        this.toast.success('update status success');
        this.model.reservation.reload()
          .then(() => console.log('reload success'))
          .then(() => console.error('reload fail'))
      })
      .catch(o => {
        console.error(o);
        for (const err of o.errors) {
          this.toast.error(err.detail, err.title);
        }
      })
    // console.log(this.model.reservation.save())
    console.log(new_status)
  }


}
