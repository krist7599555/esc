<template lang="pug">
  div.middle
    .cal-month
      p {{"<"}}
      p.title {{Date.now()}}
      p {{">"}}

    .calendar
      .cal-row(v-for="idx in Array(1).fill(0)")
        .cal-col(v-for="idx in Array(7).fill(0)") {{idx}}
    hr
    .control-buttons
      b-button.action-btn(type="is-primary") Reserve by time
      b-button.action-btn(type="is-primary") Reserve by room
    hr
    div
      p.title avaiable
      hr
      .reserve-list
        .card 
          div.card-content
            span.title.has-text-primary Room 1A 
            span.header - 6 person room
          div
            b-button.card-action.is-primary Reserve
            b-button.card-action.has-text-primary More detail
        .card 
          div.card-content
            span.title.has-text-primary Room 2A 
            span.header - 6 person room
          div
            b-button.card-action.is-primary Reserve
            b-button.card-action.has-text-primary More detail
        .card 
          div.card-content
            span.title.has-text-primary Room 1C 
            span.header - 6 person room      
          div
            b-button.card-action.is-primary Reserve
            b-button.card-action.has-text-primary More detail
    div
      p.title reserved
      hr
      .reserve-list
        .card
          div.card-content
            span.title.has-text-primary Room 1B 
            span.header - 6 person room
            p
              span reserved by&nbsp;
              span.has-text-black Rodchananat K.
          div
            b-button.card-action.is-primary(disabled) Reserve
            b-button.card-action.has-text-primary More detail
        .card
          div.card-content
            span.title.has-text-primary Room 1B 
            span.header - 6 person room
            p
              span reserved by&nbsp;
              span.has-text-black Rodchananat K.
          div
            b-button.card-action.is-primary(disabled) Reserve
            b-button.card-action.has-text-primary More detail

</template>

<script>
export default {
  data() {
    return {
      range: [1, 2, 3, 4, 5, 6, 7]
    };
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

.card {
  margin-bottom: 12px;
}

.card-content {
  padding: 8px 0 8px 16px;
}
.action-btn {
  margin-left: 2.5%;
  margin-right: 2.5%;
  width: 45%;
}

.card-action {
  width: 50%;
}
</style>
