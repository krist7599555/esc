<template lang="pug">
  .middle.columns
    //- .swap-on-mobile.is-8
    #item-list.column
      EscCalendarItem.is-success(time=" 13:00 - 14:00" name="Sample Project" reserverName="road" room="ป2")
      EscCalendarItem(time="13:00 - 14:00" name="Sample Project" reserverName="road" room="ป2")
      EscCalendarItem.is-warning(time="13:00 - 14:00" name="Sample Project" reserverName="road" room="ป2")
      EscCalendarItem(time="13:00 - 14:00" name="Sample Project" reserverName="road" room="ป2")
    .column.is-flex-center#date-picker
      b-datepicker(inline v-model='time.date' :events='[]' size="is-small" indicators='dots' :min-date='time.minDate' :max-date='time.maxDate' tabIndex="-1")
        template
          div(align='center')
            #esc-durationpicker__wrapper.is-flex-center
              label(style="margin: auto 0; padding: 0 0.8rem;") ระยะเวลา
              b-icon(type='is-primary' icon='caret-left' size='is-medium' @click.native='shiftTime(-30, "end")')
              b-timepicker(size='is-small' v-model="duration" inline :increment-minutes='30' :default-minutes='0')
              b-icon(type='is-primary' icon='caret-right' size='is-medium' @click.native='shiftTime(30, "end")')
          div(align='center')
            #esc-timepicker__wrapper.is-flex-center
              b-icon(type='is-primary' icon='caret-left' size='is-medium' @click.native='shiftTime(-30, "start"); shiftTime(-30, "end");')
              b-timepicker(size='is-small' v-model="time.start" inline :increment-minutes='30' :default-minutes='0')
              label(style="margin: auto 0; padding: 0 0.8rem;") -
              b-timepicker(size='is-small' v-model="time.end" inline :increment-minutes='30' :default-minutes='0' disabled)
              b-icon(type='is-primary' icon='caret-right' size='is-medium' @click.native='shiftTime(30, "start"); shiftTime(30, "end");')
    // - RIGHT
    .column.is-4#reserve-form
      .box
        b-field(label='เรื่อง' horizontal)
          b-input(v-model='title')
        b-field(label='วันที่' horizontal)
          //- b-button.is-static {{strDate(date)}}
          b-button.is-static {{dayjs(time.date).format('D MMMM YYYY')}} ({{time.relativeTimeFormat(time.date)}})
        b-field(label='เวลา' horizontal)
          b-button.is-static {{time.strTime(time.start)}} - {{time.strTime(time.end)}} ({{diffTime}})
        b-field(label='ห้อง' horizontal)
          b-field(grouped style="flex-wrap: wrap;")
            .control(v-for='room in roomsAll')
              b-button.is-small(
                :class="{'is-primary': rooms.includes(room)}"
                @click="toggleRoom(room);"
                style="margin-top: 1em;"
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
import { value, state, computed } from "vue-function-api";

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
    const diffTime = computed(() => {
      const minute = dayjs(time.end).diff(time.start, "minute");
      if (minute < 0) return "invalid interval";
      if (minute == 0) return "empty interval";
      return _.join(
        [
          `${_.floor(minute / 60)} ชั่วโมง`,
          minute % 60 ? `${minute % 60} นาที` : ""
        ],
        " "
      ).trim();
    });

    const duration = computed(() => {
      const minutes = dayjs(time.end).diff(time.start, "minute");
      return dayjs().startOf("day").add(minutes, "minute").toDate(); // HH:MM = diff
    })

    const shiftTime = ((diff, field) => {
      let newTime = dayjs(time[field]).add(diff, "minute")
      if (newTime.get("day") != dayjs(time[field]).get("day")) { // wrap around day -- todo: checkLimit
        return false;
      }
      time[field] = newTime.toDate();
      return true;
    }).bind(this);

    return {
      dayjs,
      time,
      diffTime,
      shiftTime,
      duration,
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

$tablet: 768px; // make iPad a tablet

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
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

#esc-timepicker__wrapper, #esc-durationpicker__wrapper {
  .dropdown-content {
    box-shadow: none;
  }
  .icon {
    margin: auto 3px;
    cursor: pointer;
  }
}

.swap-on-mobile {
  display: flex;
  flex-direction: row;
}

@include mobile {
  #item-list {
    order: 2;
    flex: 0 1 100%;
  }

  #date-picker {
    flex: 0 1 100%;
    order: 1;
  }

  #reserve-form {
    flex: 0 1 100%;
    order: 3;
  }
}

@include tablet {
  #item-list {
    flex: 0 1 40%;
  }

  #date-picker {
    flex: 0 1 40%;
  }

  #reserve-form {
    flex: 0 1 100%;
  }
}
</style>
