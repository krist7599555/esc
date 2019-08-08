<template lang="pug">
  div.middle
    .calendar.has-background-light
      .cal-date
        span.icon
          i.fas.fa-chevron-left
        p.has-text-weight-bold.is-size-4.cal-date-text {{moment().format("D MMM")}} - {{moment().add(6, "days").format("D MMM")}}
        span.icon
          i.fas.fa-chevron-right
      .calendar-icons
        .cal-row(v-for="_ in Array(1).fill(0)")
          .cal-day-icon(
            v-for="(_, idx) in Array(7).fill(0)"
            :class="{active: idx == selectedDate}"
            @click="selectDate(idx)"
          )  {{idx + 6}}

    .spacing

    .select-time-field.has-background-light
      p.header เลือกเวลา
      b-field
        b-select(
          align='center'
          placeholer="From ..."
          style="margin: 0 0 0 auto; max-width: 166px;"
          expanded
        )
          option(value="11:30") 11:30
          option(value="12:30") 12:30
          option(value="13:30") 13:30
          option(value="14:30") 14:30
        label(style="margin: auto 0; padding: 0 1rem;") ถึงเวลา
        b-select(
          align='center'
          placeholer="To ..."
          style="margin: 0 auto 0 0; max-width: 166px;"
          expanded
        )
          option(value="11:30") 11:30
          option(value="12:30") 12:30
          option(value="13:30") 13:30
          option(value="14:30") 14:30
   
    .spacing

    .room-selector.has-background-light
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
import * as moment from 'moment';
import ReserveByTimeCard from './ReserveByTimeCard';
export default {
  data() {
    const rooms = ["ป2", "ป3", "ป4", "ป5", "กวศ", "ปญ"];
    const selectedRooms = {};
    rooms.forEach(r => {selectedRooms[r] = false;});
    return {
      selectedDate: 0,
      selectedRooms,
      rooms,
      range: [1, 2, 3, 4, 5, 6, 7],
      moment, // moment lib
      isReservingByTime: false,
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
    toggleRoom(roomName){
      this.selectedRooms[roomName] = !this.selectedRooms[roomName]; 
    }
  }
};
</script>

<style lang="scss">
$border: 1px solid #d2d2d2;

.middle {
  // margin: 0 auto;
  max-width: 768px;
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
