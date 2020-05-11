import Route from '@ember/routing/route';

export default class RoomsIndexRoute extends Route {
  async model() {
    console.log('runnn')
    const rooms = await this.store.query('room', {});
    return {
      rooms,
      value: 13
    }
  }
}
