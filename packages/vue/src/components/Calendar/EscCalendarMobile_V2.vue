<template lang="pug">
  .columns
    .column
      b-message.
        {{date.format()}}
        #[br]
        {{time && time.format()}}
        #[br]
        #[br]
        dura {{duration && duration.format()}}
        #[br]
        #[hr]
        {{startTime.format()}}
        #[br]
        {{endTime.format()}}
    //- .column
      h1 รายการจองวัน{{days.full[day]}} ที่ {{dayjs(date).format('D MMMM YYYY')}}
      br
      EscCalendarItem.is-success(time=" 13:00 - 14:00" name="Sample Project" reserverName="road" room="ป2")
      EscCalendarItem(time="13:00 - 14:00" name="Sample Project" reserverName="road" room="ป2")
      EscCalendarItem.is-warning(time="13:00 - 14:00" name="Sample Project" reserverName="road" room="ป2")
      EscCalendarItem(time="13:00 - 14:00" name="Sample Project" reserverName="road" room="ป2")
    .column
      b-datepicker(
        :value='date.toDate()'
        @input='date = dayjs($event).startOf("day")'
        :events='[]'
        :day-names='daysAll'
        inline size="is-small" tabIndex="-1" indicators='dots'
        :min-date='dayjs().startOf("day").toDate()'
        :max-date='dayjs().add(7, "day").toDate()'
      )
        div
          br
          b-field
            b-select(
              v-model='duration'
              expanded placeholder='ความยาวเวลา' icon='clock'
            )
              option(v-for='t in timeDurations' :key='t.format()' :value='t') {{t.format('H ชม mm นาที')}}

          b-field
            .control
              b-button.is-primary
                b-icon(@click.native='time = time.subtract(30, "minute")' icon='caret-left')
            b-select(
              v-model='time'
              :disabled='!duration'
              expanded placeholder='ช่วงเวลา'
            )
              option(v-for='t in timeClocks' :key='t.format()' :value='t').
                {{t.format('HH:mm')}}-{{mergeDayjs(t, duration).format('HH:mm')}}
            .control
              b-button.is-primary
                b-icon(@click.native='time = time.add(30, "minute")' icon='caret-right')
          br
          b-field
            b-input(v-model='title' placeholder="หัวเรื่อง/รายการจอง")
          b-field
            b-button(type='is-primary' size='is-medium' @click='submit') จองห้อง

</template>

<script>
// import * as moment from "moment";
import _ from "lodash";
import dayjs from "dayjs";
import axios from "axios";
import ReserveByTimeCard from "./ReserveByTimeCard";
import EscCalendarItem from "./EscCalendarItem";
import { value } from "vue-function-api";
dayjs.locale("th");

dayjs.prototype.addTime = function(rhs) {
  console.log("call add tmime");
  console.log(this);
  if (dayjs.isDayjs(rhs)) {
    return this.add(rhs.hour(), "hour").add(rhs.minute(), "minute");
  } else {
    throw new Error("rhs is not dayjs");
  }
};
import { minute2dayjs, mergeDayjs } from "./EscCalendarAPI";

const timeDurations = _.range(30, 4 * 60, 30).map(minute2dayjs);
const timeClocks = _.range(8 * 60, 22 * 60, 30).map(minute2dayjs);

export default {
  setup(props, { root }) {
    const roomsAll = ["ป2", "ป3", "ป4", "ป5", "กวศ", "ปญ"];
    const daysAll = "อา จ อ พ พฤ ศ ส".split(" ");

    const title = value(null);
    const date = dayjs().startOf("day");
    const time = value(null);
    const duration = value(null);
    const room = null;
    return {
      // LIB
      dayjs,
      // STATE
      title,
      date,
      duration,
      time,
      room,
      // SELECT
      timeClock: null,
      timeDuration: null,
      // ARRAY
      daysAll,
      roomsAll,
      timeClocks,
      timeDurations,
      // UTIL
      mergeDayjs,
      // FUNCTION
      submit: () => {
        console.log(title.value);
        if (!title.value) {
          return root.$toast.open({ message: "ต้องใส่หัวเรื่อง" });
        }
        axios
          .post("/api/rooms", {
            title: title.value,
            start: time.value.startISO(),
            end: time.value.endISO(),
            room: room
          })
          .catch(e => console.error(e.response));
      }
      // toggleRoom: room => {
      //   rooms.value = _.xor(rooms.value, [room]);
      // }
    };
  },
  components: {
    ReserveByTimeCard,
    EscCalendarItem
  },
  computed: {
    startTime() {
      return this.time ? this.date.add(this.time) : this.date;
    },
    endTime() {
      return this.startTime && this.duration
        ? this.startTime.addTime(this.duration)
        : this.startTime;
    }
  }
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/mixins";
$border: 1px solid #d2d2d2;

$tablet: 768px; // make iPad a tablet

.middle {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
</style>
