<template lang="pug">
  .card 
    div.card-content
      span.title.has-text-primary {{ roomName }} &nbsp;
      span.header - {{ roomType }}
      p(v-if="reserver")
        span reserved by&nbsp;
        span.has-text-black {{ reserver }}
    div
      b-button.card-action.is-primary(:disabled="!!reserver") Reserve
      b-button.card-action.has-text-primary More detail
</template >

<script>
export default {
    props: ["roomName", "roomType", "reserver"],
}
</script>

<style>
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
