import Route from '@ember/routing/route';

export default class RoomsShowRoute extends Route {
  async model(param) {
    console.log("RoomsShowRoute -> model -> param", param)
    const room = await this.store.findRecord('reservations', param.room_id);
    return {
      room_id: param.room_id,
      room: room
    }
  }
}
