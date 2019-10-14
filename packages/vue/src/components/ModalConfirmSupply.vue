<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">ยืนยันรายการ</p>
    </header>
    <section class="modal-card-body">
      <b-table :data="data">
        <template slot-scope="props">
          <b-table-column field="label" label="label">{{ props.row.label }}</b-table-column>
          <b-table-column field="pick" label="quantity">{{ props.row.pick }}</b-table-column>
        </template>
      </b-table>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$emit('close');">ยกเลิก</button>
      <button class="button is-primary" @click="$emit('confirm'); $emit('close');">ยืนยัน</button>
    </footer>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>
