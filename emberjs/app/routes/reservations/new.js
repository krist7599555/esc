import Route from '@ember/routing/route';
import dayjs from 'dayjs';
import { range } from 'lodash'

function _days() {
  const now = dayjs().startOf('day');
  return range(0, 8).map(nm => {
    const cur = now.add(nm, 'day');
    return {
      label: cur.format('DD MMMM (ddd)'),
      value: cur.format()
    }
  })
}

function _clocks() {
  const now = dayjs().startOf('day');
  return range(8, 21, 0.5).map(nm => {
    const cur = now.add(nm * 60, 'minute');
    return {
      label: cur.format('H:mm'),
      value: cur.format()
    }
  })
}

export default class ReservationsNewRoute extends Route {
  async model() {
    const rooms = await this.store.query('room', {})
    console.log("RoomsNewRoute -> model ->  rooms",  rooms)
    // const clocks = ["8:00", "8:30", "9:00", "9:30", "10:00"]
    // const days = ["12 May", "13 May", "14 May"];
    return {
      rooms,
      clocks: _clocks(),
      days: _days()
    }
  }
}
