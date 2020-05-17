import Route from '@ember/routing/route';
import * as dayjs from 'dayjs';
import * as _ from 'lodash'
import { inject as service, Registry as Services } from '@ember/service';

function _days() {
  const now = dayjs().startOf('day');
  return _.range(0, 8).map(nm => {
    const cur = now.add(nm, 'day');
    return {
      label: cur.format('DD MMMM (ddd)'),
      value: cur.format()
    }
  })
}

function _clocks() {
  const now = dayjs().startOf('day');
  return _.range(8, 21, 0.5).map(nm => {
    const cur = now.add(nm * 60, 'minute');
    return {
      label: cur.format('H:mm'),
      value: cur.format()
    }
  })
}

export default class ReservationsNewRoute extends Route {
  @service auth: Services["auth"];

  beforeModel() {
    if (!this.auth.is_auth) {
      this.transitionTo("login");
    }
  }
  async model() {

    const rooms = await this.store.query('room', {})
    return {
      rooms,
      clocks: _clocks(),
      days: _days()
    }
  }
}
