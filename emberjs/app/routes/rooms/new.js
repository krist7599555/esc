import Route from '@ember/routing/route';

export default class RoomsNewRoute extends Route {
  async model() {
    const rooms = await this.store.query('room', {})
    console.log("RoomsNewRoute -> model ->  rooms",  rooms)
    const clocks = ["8:00", "8:30", "9:00", "9:30", "10:00"]
    const days = ["12 May", "13 May", "14 May"];
    return {
      rooms,
      clocks: clocks.map(c => ({value: c, label: c})),
      days: days.map(c => ({value: c, label: c})),
    }
  }
}
