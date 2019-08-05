<template>
  <div class="esc-table">
    <div class="esc-table__head">
      <table cellpadding="0" cellspacing="0" border="0">
        <thead>
          <slot name="thead"></slot>
        </thead>
      </table>
    </div>
    <div class="esc-table__body">
      <table cellpadding="0" cellspacing="0" border="0">
        <tbody>
          <slot name="tbody"></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.esc-table {
  table {
    width: 100%;
    table-layout: fixed;
  }
  th {
    padding: 20px 15px;
  }
  td {
    padding: 15px;
    vertical-align: middle;
    border-bottom: solid 1px rgba(255, 255, 255, 0.1);
  }
  &__body {
    height: 300px;
    overflow-x: auto;
    margin-top: 0px;
  }
}

::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
  &-track {
    border-radius: 10px;
    border: solid #f5f5f5 10px;
  }
  &-thumb {
    border-radius: 10px;
    background-color: #5554;
  }
}
</style>
