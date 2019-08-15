<template>
  <div class="esc-pagecontainer">
    <div class="esc-pagecontainer__box">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.esc-pagecontainer {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #9f353599;
  min-height: calc(100vh - 50px);
  background-image: url("../assets/background.jpg");
  background-size: cover;
}
.esc-pagecontainer__box {
  margin-top: 30px;
  margin-bottom: 50px;
  max-width: 500px;
  box-shadow: 0px 5px 10px 5px rgba(10, 10, 10, 0.2);
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
}
</style>

