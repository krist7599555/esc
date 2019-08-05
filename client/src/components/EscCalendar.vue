<template>
  <div class="esc-calenda">
    <h1>{{today}}</h1>
    <h1>{{times}}</h1>
    <EscBaseTable>
      <template v-slot:thead>
        <tr>
          <th class="esc-calenda-date-parginate" :colspan="resources.length + 1">
            <span>
              <div class="button">&lt;</div>
            </span>
            <span>
              <div class="title is-inline">today</div>
            </span>
            <span>
              <div class="button">&gt;</div>
            </span>
          </th>
        </tr>
        <tr>
          <th></th>
          <th v-for="h in resources" :key="h.id">{{h.label}}</th>
        </tr>
      </template>
      <template v-slot:tbody>
        <tr v-for="t in times" :key="t.id">
          <td class="has-text-right">{{t}}</td>
          <td
            v-for="h in resources"
            :key="h.id"
            :time="t"
            :room="h.label"
            @click="clickHandle($event.target)"
          ></td>
        </tr>
      </template>
    </EscBaseTable>
  </div>
</template>

<script>
import moment from "moment";
import _ from "lodash";
import EscBaseTable from "./EscBaseTable";
import EscCalendaItem from "./EscCalendarItem";
import Vue from "vue";

export default {
  components: { EscBaseTable },
  data() {
    return {
      select: null,
      today: moment(),
      times: _.flatMap(_.range(6, 22), num => [`${num}:00`, `${num}:30`]),
      resources: [
        { id: "a", label: "A" },
        { id: "b", label: "B", eventColor: "green" },
        { id: "c", label: "C", eventColor: "orange" },
        { id: "d", label: "D", eventColor: "red" },
        { id: "e", label: "E", eventColor: "red" }
      ],
      events: [
        {
          title: "test",
          allDay: true,
          start: moment(),
          end: moment().add(1, "d")
        },
        {
          title: "another test",
          start: moment().add(2, "d"),
          end: moment()
            .add(2, "d")
            .add(2, "h")
        }
      ]
    };
  },
  methods: {
    clickHandle(el) {
      switch (el.tagName) {
        case "TD": {
          const { newElement } = this.createButton({ el, duration: 2 });
          // console.log(newElement);
          el.appendChild(newElement);
        }
      }
      // console.log(el, el.tagName);
    },
    createButton({ el, time, room, duration }) {
      el = el || document.querySelector(`[time='${time}'][room='${room}']`);

      if (!el) return null;
      // console.log(el);
      // console.log(el.clientHeight);
      // console.log(el.offsetHeight);
      // const width = el.clientWidth;
      // const height = el.clientHeight + 0.7;
      // const size = { x: 1, y: duration };
      // const padding = 0;
      // const pixel = {
      //   px: 0 + padding,
      //   py: 0 + padding,
      //   w: width * size.x - 2 * padding,
      //   h: height * size.y - 2 * padding
      // };

      const _EscCalendaItem = Vue.extend(EscCalendaItem);
      const instance = new _EscCalendaItem({
        // parent: el,
        parent: this,
        // data: {
        //   repeat: duration
        // },
        propsData: {
          message: "OK"
        },
        mounted() {
          console.log(this);
          // this.$el.addEventListener("click", e => {
          //   console.log("cclick");
          // });
          // this.$el.addEventListener("mouseover", e => {
          //   console.log("mmouseover");
          // });
          // console.log("mount from calenda", this.$el);
        }
      });
      // instance.$on("click", e => {
      //   console.log("OK 122");
      // });
      // instance.$on("mouseover", e => {
      //   console.log("mouseover OK 125");
      // });

      instance.$mount();
      // console.log(pixel);
      // _.assign(instance.$el.style, {
      //   height: pixel.h + "px",
      //   width: pixel.w + "px",

      //   position: "absolute",
      //   top: 0,
      //   left: 0
      // });
      // instance.$el.style.height = pixel.h;
      return { parent: el, newElement: instance.$el };
      // return { parent: el, newElement: task };
    }
    // addBtn(time, room) {}
  },
  mounted() {}
  // props: {
  //   events: {
  //     type: Object,
  //     default: () => [{}, {}]
  //   },
  //   resources: {
  //     type: Object,
  //     default: () => [{}, {}]
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.esc-calenda-date-parginate {
  text-align: center;
  > span {
    padding: 7px;
  }
}
.esc-calenda {
  td {
    border: solid rgba(91, 91, 91, 0.1) 1px;
    padding: 2px 7px;
    padding: 0px 0px;
    position: relative;
  }
  tr:nth-child(even) td:first-child {
    opacity: 0;
  }
}
</style>
