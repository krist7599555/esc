<template>
  <Layout>
    <vue-cal
      selected-date="2019-10-15"
      style="height: 90vh"
      :time-from="8 * 60"
      :time-to="20 * 60"
      :time-step="30"
      :disable-views="['years', 'year', 'day']"
      editable-events
      :events="events"
      :split-days="splitDays"
      :sticky-split-labels="true"
      :min-split-width="180"
      :events-on-month-view="true"
      :show-all-day-events="true"
    ></vue-cal>
  </Layout>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
// import dayjs from "dayjs";

export default {
  name: "reservation2",
  components: { VueCal },
  data: () => ({
    today: "2019-10-15 18:30",
    stickySplitLabels: true,
    minCellWidth: 400,
    minSplitWidth: 0,
    splitDays: [
      { class: "pj3", label: "ประชุม 3" },
      { class: "pj4", label: "ประชุม 4" },
      { class: "pj5", label: "ประชุม 5" },
      { class: "esc", label: "ประชุมกวศ" },
      { class: "big", label: "ประชุมใหญ่" }
    ],
    events: [
      {
        start: "2019-10-15 18:30",
        end: "2019-10-15 18:30",
        title: "Doctor appointment",
        content: '<i class="v-icon material-icons">local_hospital</i>',
        class: "health",
        split: 1
      },
      {
        start: "2019-10-15 18:30",
        end: "2019-10-15 19:15",
        title: "Dentist appointment",
        content: '<i class="v-icon material-icons">local_hospital</i>',
        class: "health",
        split: 2
      },
      {
        start: "2019-10-16 18:30",
        end: "2019-10-16 20:30",
        title: "Crossfit",
        content: '<i class="v-icon material-icons">fitness_center</i>',
        class: "sport",
        split: 1
      }
    ]
  })
};
</script>

<style lang='scss'>
.vuecal__cell-split {
  &.pj3,
  &.pj4,
  &.pj5 {
    background-color: rgba(221, 238, 255, 0.5);
  }
  &.esc {
    background-color: rgba(255, 232, 251, 0.5);
  }
  &.big {
    background-color: rgba(221, 255, 239, 0.5);
    border-right: solid 1.5px #92b2b9;
  }
}
.vuecal__cell-split .split-label {
  color: rgba(0, 0, 0, 0.1);
  font-size: 26px;
}

/* Different color for different event types. */
.vuecal__event.leisure {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
.vuecal__event.health {
  background-color: rgba(164, 230, 210, 0.9);
  border: 1px solid rgb(144, 210, 190);
}
.vuecal__event.sport {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
</style>
