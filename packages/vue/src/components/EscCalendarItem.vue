
<template>
  <div class="esc-calenda-item" :style="mstyle">
    <div class="button is-success">
      <div>{{message}}</div>
    </div>
    <div class="menu">
      <ul>
        <li>move</li>
        <li>delete</li>
      </ul>
    </div>
    <div class="esc-calenda-item__fixed-controller">
      <b-icon icon="plus"></b-icon>
      <b-icon icon="minus"></b-icon>
      <b-icon icon="chevron-up"></b-icon>
      <b-icon icon="chevron-down"></b-icon>
      <b-icon icon="arrows-alt"></b-icon>
      <b-icon icon="trash"></b-icon>
      <b-icon icon="coffee"></b-icon>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "esc-calenda-item",
  props: {
    message: {
      default: "Hel"
    },
    x: { default: 1 },
    y: { default: 3 }
  },
  data() {
    return {
      repeat: 5,
      pa: null,
      mstyle: {
        position: "absolute"
      }
    };
  },
  methods: {
    updateStyle() {
      this.pa = this.$el.parentElement;
      console.log(this.pa);
      console.log(this.pa.clientHeight, this.pa.clientWidth);
      console.log(this.pa.offsetHeight, this.pa.offsetWidth);
      this.mstyle = {
        height: this.pa.clientHeight * this.y + "px",
        width: this.pa.clientWidth * this.x + "px",
        position: "absolute",
        top: 0,
        left: 0
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.dir(this.$el.parentElement);
      console.log(_.get(this.$el.parentElement, "clientHeight"));
      console.dir(this.$el.parentElement.offsetHeight);
      this.updateStyle();
    });
  }
};
</script>

<style lang="scss" scoped>
.button {
  overflow: visible;
  z-index: 10;
  width: 100%;
  height: 100%;
}
.menu {
  border-radius: 4px;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  padding: 4px;
  color: white;
  background-color: #363636;
  transition: all 0.5s ease-in-out;
  z-index: 2;
  overflow: auto;
  height: 100%;
}
.esc-calenda-item:hover .menu,
.esc-calenda-item .menu:hover {
  transform: translateX(-30px);
}

.esc-calenda-item__fixed-controller {
  position: fixed;
  height: 200px;
  width: 100vw;
  background-color: orange;
  top: 0;
  left: 0;
  border-radius: 4px;
  padding: 2rem 1.5rem;
  @media screen and (min-width: 1000px) {
    $height: 200px;
    $width: 130px;
    height: $height;
    width: $width;
    top: 60%;
    left: 10%;
    // left: 10%;
    // bottom: 0;
  }
}
// .button::after {
//   // content: "\f078";
//   content: "v";
//   font-family: FontAwesome;
//   position: absolute;
//   /* left: 0; */
//   bottom: top;
//   /* bottom: -20%; */
//   /* display: flex; */
//   /* transform-origin: 50% 50%; */
//   left: 50%;
//   transform: translate(-50%, -50%);
//   bottom: -50%;
//   background-color: #0004;
//   padding: 5px 10px 0px;
//   border-radius: 100px;
// }
</style>

