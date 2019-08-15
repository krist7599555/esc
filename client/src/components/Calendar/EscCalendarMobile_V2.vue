<template lang="pug">
  .middle.columns
    .column.is-3
      EscCalendarItem
      EscCalendarItem
      EscCalendarItem
      EscCalendarItem
    .column(align='center')
      .is-flex-center
        b-datepicker(inline v-model='date' :events='[]' indicators='dots' :min-date='minDate' :max-date='maxDate')
          //- b-button(type='is-primary' icon-left='calendar-day' @click='date = new Date()') Today
          //- br
          //- br
          template
            div(align='center')
              #esc-timepicker__wrapper.is-flex-center
                b-timepicker(size='is-small' v-model="start" inline :increment-minutes='30' :default-minutes='0')
                label(style="margin: auto 0; padding: 0 1rem;") -
                b-timepicker(size='is-small' v-model="end" inline :increment-minutes='30' :default-minutes='0')


    // - RIGHT
    .column.is-5
      .box(style='height: 100%')
        b รายการจองก่อนหน้า
        p ไม่มีรายการจองในช่วงเวลานี้
        hr
        b-field(label='เรื่อง' horizontal)
          b-input(v-model='title')
        b-field(label='วันที่' horizontal)
          //- b-button.is-static {{strDate(date)}}
          b-button.is-static {{dayjs(date).format('D MMMM YYYY')}} ({{relativeTimeFormat(date)}})
        b-field(label='เวลา' horizontal)
          b-button.is-static {{strTime(start)}} - {{strTime(end)}}
        b-field(label='ห้อง' horizontal)
          b-field(grouped)
            .control(v-for='room in roomsAll')
              b-button.is-small(
                :class="{'is-primary': rooms.includes(room)}"
                @click="toggleRoom(room);"
              ) {{room}}

        br

        b-button(type='is-primary' @click='submit') จอง



</template>

<script>
// import * as moment from "moment";
import _ from "lodash";
import dayjs from "dayjs";
import axios from "axios";
import ReserveByTimeCard from "./ReserveByTimeCard";
import EscCalendarItem from "./EscCalendarItem";
import { value, state } from "vue-function-api";

const joinString = _ar => {
  let ar = _.clone(_ar);
  const sml = ["ป2", "ป3", "ป4", "ป5"];
  if (_.difference(sml, ar).length == 0) {
    ar = _.concat(["ประชุมเล็ก"], ..._.xor(ar, sml));
  }
  switch (ar.length) {
    case 0:
      return "ไม่ได้เลือก";
    case 1:
      return ar[0];
    case 6:
      return "ห้องใดก็ได้";
    default:
      return _.join(_.dropRight(ar), ", ") + " หรือ " + _.last(ar);
  }
};

const dateAPI = () => {
  const now = dayjs();
  const floor = dayjs().startOf("hour");
  const ceil = floor.add(1, "hour");
  const minDate = dayjs().subtract(1, "day");
  const maxDate = dayjs().add(7, "day");
  const strDate = date => dayjs(date).format("YYYY-MM-DD");
  const strTime = date => dayjs(date).format("HH:mm");
  const mergeDateTime = (date, time) =>
    dayjs(`${strDate(date)}T${strTime(time)}+0700`).format();
  return state({
    date: now.toDate(),
    start: floor.toDate(),
    end: ceil.toDate(),
    strDate,
    strTime,
    minDate: minDate.toDate(),
    maxDate: maxDate.toDate(),
    toISO(field) {
      return mergeDateTime(this.date, this[field]);
    },
    relativeTimeFormat(date) {
      const dif = dayjs(date)
        .startOf("day")
        .diff(dayjs().startOf("day"), "day");
      return dif ? `อีก ${dif} วัน` : "วันนี้";
    }
  });
};

export default {
  setup() {
    const roomsAll = ["ป2", "ป3", "ป4", "ป5", "กวศ", "ปญ"];
    const rooms = value(_.clone(roomsAll));

    const title = value("");
    const time = dateAPI();

    const submit = () => {
      console.log(time.toISO("start"));
      console.log(time.toISO("end"));
      axios
        .post("/api/rooms", {
          title: title.value,
          start: time.toISO("start"),
          end: time.toISO("end"),
          rooms: rooms.value
        })
        .catch(e => console.error(e.response));
    };

    return {
      dayjs,
      ...time,
      title,
      rooms,
      roomsAll,
      submit,
      joinString,
      toggleRoom: room => {
        rooms.value = _.xor(rooms.value, [room]);
      }
    };
  },
  components: {
    ReserveByTimeCard,
    EscCalendarItem
  }
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/mixins";
$border: 1px solid #d2d2d2;

.rnd-padd {
  @include tablet {
    border-radius: 5px;
    overflow: hidden;
    padding: 1.3rem 1.5rem;
  }
}

.middle {
  width: 100%;
  max-width: 1100px;
  // min-width: 100vw;
  // @include tablet {
  //   min-width: 600px;
  // }
}

.cal-date {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
}

.cal-row {
  display: flex;
  justify-content: space-evenly;
}

.cal-day-icon {
  display: flex;
  justify-content: center;
  vertical-align: middle;
  $size: 40px;
  min-width: $size;
  min-height: $size;
  // height: 10vw;
  // width: 10vw;

  border-radius: 50%;
  color: #780000;
  border: 2px solid #780000;
  background-color: white;
  text-align: center;
  // line-height: 28px; // hieght
  cursor: pointer;
}

.cal-day-icon.active {
  color: white;
  background-color: #780000;
}

#esc-timepicker__wrapper {
  .dropdown-content {
    box-shadow: none;
  }
}
</style>
