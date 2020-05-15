import Route from '@ember/routing/route';

export default class ReservationsIndexRoute extends Route {
  async model() {
    const reservations = await this.store.findAll('reservation');
    return {
      reservations
    }
  }
}
