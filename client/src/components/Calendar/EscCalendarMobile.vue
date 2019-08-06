<template lang="pug">
  div.middle
    .cal-month
      p {{"<"}}
      p.title {{moment().format("D MMMM")}} - {{moment().add(6, "days").format("D MMMM")}}
      p {{">"}}
    .calendar
      .cal-row(v-for="idx in Array(1).fill(0)")
        .cal-col(v-for="idx in Array(7).fill(0)") {{idx}}
    hr
    .control-buttons
      b-button.action-btn(type="is-primary") Reserve by time
      b-button.action-btn(type="is-primary") Reserve by room
    hr
    
    div(v-if="isReservingByTime")      
        ReserveByTimeCard(
          :roomName="'Room 1A'"
          :roomType="'6 person room'"
          :reserver="null"
        )
        ReserveByTimeCard(
          :roomName="'Room 2A'"
          :roomType="'6 person room'"
          :reserver="null"
        )
        ReserveByTimeCard(
          :roomName="'Room 1B'"
          :roomType="'10 person room'"
          :reserver="null"
        )
    div(v-if="isReservingByTime")
      p.title reserved
      hr
      .reserve-list
        ReserveByTimeCard(
          :roomName="'Room 2B'"
          :roomType="'10 person room'"
          :reserver="'Rodchananat K.'"
        )
        ReserveByTimeCard(
          :roomName="'Room 1C'"
          :roomType="'15 person room'"
          :reserver="'Krist'"
        )
    div(v-if="!isReservingByTime")
      p.title Table for Room 1A 
      p.header Click reserve card to reserve
      hr
      
      .title.is-primary =========== start - 8:00 ================
      
      .header.seperator มีคนจองระหว่างนี้
      //- .card 
      //-   div.card-content
      //-     span.title.has-text-primary 9:30 - 12:30&nbsp;
      //-     span.header - 3 hours
      //-     p
      //-       span reserved by&nbsp;
      //-       span.has-text-black.is-size-5.has-text-weight-bold {{ 'Rodchananat' }}
      .card.has-background-primary
        div.card-content
          span.title.has-text-white 12:30 - 16:00&nbsp;
          span.header - 3:30 hours
          p
            span.is-size-4.has-text-weight-bold Avaiable for reserve
          b-button.card-action.is-inverted Reserve
      .header.seperator มีคนจองระหว่างนี้
      //- .card 
      //-   div.card-content
      //-     span.title.has-text-primary 16:00 - 17:30&nbsp;
      //-     span.header - 1:30 hours
      //-     p
      //-       span reserved by&nbsp;
      //-       span.has-text-black.is-size-5.has-text-weight-bold {{ 'Krist' }}
      //- .card 
      //-   div.card-content
      //-     span.title.has-text-primary 17:30 - 18:00&nbsp;
      //-     span.header - 0:30 hours
      //-     p
      //-       span reserved by&nbsp;
      //-       span.has-text-black.is-size-5.has-text-weight-bold {{ 'Someone' }}
      .card.has-background-primary
        div.card-content
          span.title 18:00 - 19:00&nbsp;
          span.header - 1 hour
          p
            span.is-size-4.has-text-weight-bold Avaiable for reserve
          b-button.card-action.is-primary Reserve

      .title.is-primary =========== end 19:00 ================
</template>

<script>
import * as moment from 'moment';
import ReserveByTimeCard from './ReserveByTimeCard';
export default {
  data() {
    return {
      range: [1, 2, 3, 4, 5, 6, 7],
      moment, // moment lib
      isReservingByTime: false,
    };
  },
  components: {
    ReserveByTimeCard
  }
};
</script>

<style lang="scss">
.middle {
  margin: 0 auto;
  max-width: 768px;
}

.cal-month {
  display: flex;
  justify-content: space-between;
}

.cal-row {
  display: flex;
  justify-content: space-between;
}

.cal-col {
  display: block;
  min-width: 32px;
  min-height: 32px;
  border-radius: 50%;
  margin: 8px 0;
  text-align: center;
}

.cal-col:nth-child(odd) {
  background-color: red;
}

.cal-col:nth-child(even) {
  background-color: green;
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
</style>
