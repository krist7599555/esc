import Route from '@ember/routing/route';
import * as _ from 'lodash';

export default class ReservationsShowRoute extends Route {
  async model(params: { reservation_id: string }) {
    const reservation = await this.store
      .findRecord('reservation', params.reservation_id)
      .catch(_.constant(null));
    return {
      reservation
    };
  }
}
