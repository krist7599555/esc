<template lang='pug'>
  .card
    div 
      span.has-text-weight-bold.is-size-5(style="padding-right: 0.5rem;") {{time}} 
      span.has-text-primary ห้อง {{room}}
    div
      span.has-text-weight-bold {{name}}
      span.header | {{reserverName}}
</template>

<script>
export default {
  props: ["time", "name", "reserverName", "room"], 
}
</script>

<style lang="scss" scoped>

</style>
