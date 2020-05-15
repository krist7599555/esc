import Route from '@ember/routing/route';

export default class ReservationsShowRoute extends Route {
  async model(params: { reservation_id: string }) {
    const reservation = await this.store.findRecord('reservation', params.reservation_id)
    return {
      reservation
    }
  }
}
