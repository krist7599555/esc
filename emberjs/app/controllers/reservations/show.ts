import Controller               from '@ember/controller';
import { tracked }              from '@glimmer/tracking';
import { inject as service, Registry as Services } from '@ember/service';
import { action }               from '@ember/object';

export default class ReservationsShowController extends Controller {

  @service axios: Services["axios"];
  @service toast: Services["toast"];
  @service session: Services["session"];

  @tracked RESERVATIONS_STATS = [
    { value: 'pending',  label: 'รอตรวจ' },
    { value: 'approved', label: 'อนุมัติ' },
    { value: 'rejected', label: 'ปฏิเสท' },
  ]

  @action
  change_stats(new_status: string) {
    const id = this.model.reservation.id
    this.axios.request({
      method: "put",
      url   : `/api/reservations/${id}/status/${new_status}`
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
  }

  @action
  remove_reservation() {
    const id = this.model.reservation.id;
    this.axios.request({
      method: "delete",
      url: `/api/reservations/${id}`
    })
      .then(() => {
        this.toast.success('remove reservation success');
        this.model.reservation.reload()
          .then(() => console.log('reload success'))
          .then(() => console.error('reload fail'))
      })
      .catch(o => {
        for (const err of o.errors) {
          this.toast.error(err.detail, err.title);
        }
      })
  }
}
