import Route from '@ember/routing/route';

export default class RoomsShowRoute extends Route {
  async model(param) {
    const room = await this.store.findRecord('room', param.room_id);
    return {
      room: room
    }
  }
}
