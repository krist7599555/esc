import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import * as dayjs from 'dayjs';

export default class ReservationsIndexController extends Controller {

  @computed('model.reservations')
  get head_of_day() {
    const res = [];
    let prev_day = null;
    this.model.reservations.forEach(r => {
      const cur = dayjs(r.arrival_time);
      if (prev_day === null || !cur.isSame(prev_day, 'date')) {
        prev_day = cur.startOf('day');
        res.push(r.id);
      }
    });
    return res;
  }
}
