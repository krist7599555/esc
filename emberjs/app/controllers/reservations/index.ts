import Controller from '@ember/controller';
import { computed } from '@ember/object';
import * as dayjs from 'dayjs';
// import ReservationsIndexRoute from '../../routes/reservations';
// import { Await } from 'global';
import Ember from 'ember';
import ReservationModel from '../../models/reservation';

export default class ReservationsIndexController extends Controller {

  // model: Await<ReturnType<ReservationsIndexRoute["model"]>>;
  model: {
    reservations: Ember.ArrayProxy<ReservationModel>
  }

  @computed('model.reservations')
  get head_of_day() {
    const res: string[] = [];
    let prev_day: dayjs.Dayjs | null = null;
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
