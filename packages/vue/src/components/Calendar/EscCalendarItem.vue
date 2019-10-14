<template lang='pug'>
  .card
    div
      span.has-text-weight-bold.is-size-6(style="padding-right: 0.5rem;") {{time}}
      span.has-text-primary ห้อง {{room}}
    div
      span.has-text-weight-bold {{name}}
      span.header | {{reserverName}}
</template>

<script>
export default {
  props: ["time", "name", "reserverName", "room"]
};
</script>

<style lang="scss" scoped>
.card {
  padding: 0.8rem 1.5rem 0.6rem 1.8rem;
  border-radius: 9px;
  // border-radius: 0 9px 9px 0;
}
.card {
  border-left: solid 15px #780000;
  &.is-success {
    border-color: #5aaf5d;
  }
  &.is-warning {
    border-color: #f7da5b;
  }
  &.is-danger {
    border-color: #ce2b65;
  }
}
</style>
