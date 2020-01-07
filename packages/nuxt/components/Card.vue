<template lang='pug'>
.card
  .card-header
    .card-header-title
      slot(name='title') {{ title || "no-title" }}
  .card-content
    .content
      slot
        .has-text-centered NO-CONTENT
  //- .card-footer
  //-   .card-footer-item
  //-     slot(name='footer')


</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
.card {
  min-width: 320px; margin-right: 1rem; height: max-content;
  max-width: 320px;
    min-width: 300px;
    min-height: 400px;
    border-radius: 8px;
    margin-bottom: 2rem;
}
.card-content {
  background-color: #dbdbdb66;
    min-height: 520px;
}
</style>
