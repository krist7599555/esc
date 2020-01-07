
<template lang="pug">
  form(@submit.prevent style='overflow: hidden')
    b-field(label='Organization')
      b-autocomplete(
        :value='organization'
        :data='organizations'
        :open-on-focus="true"
        placeholder='e.g. ลานเกียร์'
        @input='$emit("update:organization", $event)'
      )
    b-field(label='Description')
      b-input(:value='description' @input='$emit("update:description", $event)' type='textarea')
    b-field(label='Room')
      b-select(:value='room' @input='$emit("update:room", $event)' icon='home' expanded)
          option(value='0') ห้องประชุม 1
    b-field.is-marginless(grouped position="is-centered")
      b-field(label='Time Start')
        b-select(:value='start' @input='$emit("update:start", $event)' icon='clock')
            option(value='0') 19:00
      b-field(label='Time End')
        b-select(:value='end' @input='$emit("update:end", $event)' icon='clock')
            option(value='0') 19:00
</template>


<script>
import gsap from 'gsap'

export default {
  props: {
    organization: {default: ""},
    description: {default: ""},
    room: {default: ""},
    start: {default: ""},
    end: {default: ""}
  },
  data() {
    return {
    }
  },
  computed: {
    organizations() {
      return [
        "ค่ายลานเกียร์",
        "ค่าย FE",
        "ค่ายสะพาน"
      ].filter(org => org.indexOf(this.organization) != -1)
    }
  },
  mounted() {
    gsap.from(this.$el, {height: 0, y: -20, alpha: 0}, 1)
  }
}
</script>
