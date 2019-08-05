<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">กฎระเบียบการยืมพัสดุ กวศ. 62</p>
    </header>
    <section class="modal-card-body">
      <SupplyRule></SupplyRule>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$emit('close')">Close</button>
    </footer>
  </div>
</template>

<script>
import SupplyRule from "./SupplyRule";
export default {
  components: { SupplyRule }
};
</script>

