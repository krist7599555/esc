import Route from '@ember/routing/route';
import * as _ from 'lodash';

export default class ReservationsShowRoute extends Route {
  async model(params: { reservation_id: string }) {
    console.log("ReservationsShowRoute -> model -> params", params)
    const reservation = await this.store
      .findRecord('reservation', params.reservation_id)
      .catch(_.constant(null));
    return {
      reservation
    };
  }
}
