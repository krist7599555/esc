<template lang="pug">
  .message(:status='status')
    .message-header
      .has-text-right {{title}}
      .has-text-left {{start}} - {{end}}
    .message-body
      .content
</template>


<script>
export default {
  props: {
    start: String,
    end: String,
    date: String,
    room: String,
    title: String,
    status: String,
    owner: String,
  },
  computed: {
    mstyle() {
      return this.status
    }
  }
}
</script>

<style lang="scss" scoped>
// .reserve-item
//   &[status*=approve]
//     background-color: green
//   &[status*=reject]
//     background-color: red
//   &[status*=wait],
//   &[status*=pend]
//     background-color: yellow
</style>
