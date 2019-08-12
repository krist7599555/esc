<template lang="pug">
  .middle.columns: .column.is-8
    .calendar.has-background-light.rnd-padd(style='padding: 1rem 1.5rem;')
      b-datepicker(inline v-model='date' :events='[]' :indicators='dots' :min-date='minDate' :max-date='maxDate')
        b-button(type='is-primary' icon-left='calendar-day' @click='date = new Date()') Today

    //- .spacing

    .select-time-field.has-background-light.rnd-padd
      div(align='center')
        b เลือกเวลา
        br
        .is-flex-center
          b-timepicker(v-model="timeStart" inline :increment-minutes='30')
          label(style="margin: auto 0; padding: 0 1rem;") -
          b-timepicker(v-model="timeEnd" inline :increment-minutes='30')

    .spacing

    .room-selector.has-background-light.rnd-padd
      div
        span.header.with-extra-padding เลือกห้อง
        span.has-text-primary
          i.fa-info-circle.fas
      .calendar-icons
        .cal-row
          .cal-day-icon.is-size-7(
            v-for="(roomName) in rooms"
            :class="{active: selectedRooms[roomName]}"
            @click="toggleRoom(roomName);"
          ) {{ roomName }}

    .spacing
    .reserve-notice

</template>

<script>
import * as moment from "moment";
import ReserveByTimeCard from "./ReserveByTimeCard";
export default {
  data() {
    const rooms = ["ป2", "ป3", "ป4", "ป5", "กวศ", "ปญ"];
    const selectedRooms = {};
    rooms.forEach(r => {
      selectedRooms[r] = false;
    });
    const nowDate = new Date();
    const nextDate = new Date(nowDate.getTime() + 10 * 86400000);
    nowDate.setHours(0, 0, 0, 0);
    nextDate.setHours(0, 0, 0, 0);
    return {
      date: nowDate,
      minDate: nowDate,
      maxDate: nextDate,
      timeStart: null,
      timeEnd: null,
      selectedDate: 0,
      selectedRooms,
      rooms,
      range: [1, 2, 3, 4, 5, 6, 7],
      moment, // moment lib
      isReservingByTime: false
    };
  },
  components: {
    ReserveByTimeCard
  },
  methods: {
    selectDate(idx) {
      this.selectedDate = idx;
      console.log("select date", idx);
    },
    toggleRoom(roomName) {
      this.selectedRooms[roomName] = !this.selectedRooms[roomName];
    }
  }
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/mixins";
$border: 1px solid #d2d2d2;

.is-flex-center {
  display: flex;
  justify-content: center;
}

.rnd-padd {
  @include tablet {
    border-radius: 5px;
    overflow: hidden;
    padding: 1.3rem 1.5rem;
  }
}

.middle {
  // margin: 0 auto;
  min-width: 100vw;
  max-width: 768px;
  @include tablet {
    min-width: 600px;
  }
}

.cal-date {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
}

.cal-date-text {
  border: $border;
  padding: 0 8px;
}

.calendar-icons {
  padding: 8px 16px;
}

.cal-row {
  display: flex;
  justify-content: space-between;
}

.cal-day-icon {
  display: block;
  min-width: 32px;
  min-height: 32px;
  // height: 10vw;
  // width: 10vw;

  border-radius: 50%;
  color: #780000;
  border: 2px solid #780000;
  background-color: white;
  text-align: center;
  line-height: 28px; // hieght
  cursor: pointer;
}

.cal-day-icon.active {
  color: white;
  background-color: #780000;
}

.control-buttons {
  display: flex;
  align-content: space-between;
}
.seperator {
  padding: 0px 8px;
  background: grey;
  margin: 8px 0;
}

.has-background-primary {
  * {
    color: white;
  }
}

.spacing {
  height: 8px;
}

.select-time-field {
  padding: 8px;
}

.with-extra-padding {
  padding: 0 1em;
}

.room-selector {
  padding-top: 8px; // fix span
}
</style>
