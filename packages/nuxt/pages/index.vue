<template lang="pug">
section
  #cards-section
    .overlay(v-if='!!formDate' @click='formDate = null')
    .cards
      card(v-for='{date, reserves, ...res} in records' :key='date' :style='{"z-index": formDate == date ? "1000" : "unset"}')
        template(slot='title') {{date}}
        template(slot)
          template(v-if='formDate === date')
            form-reserve(
              :key='date'
              :organization.sync='formData.organization'
              :description.sync='formData.description'
              :room.sync='formData.room'
              :start.sync='formData.start'
              :end.sync='formData.end'
            )
            hr
          button.button.is-info.is-fullwidth.shadow(@click='clickReserve(date)')
            b + Reserve Now !
          template(v-if='formDate != date')
            hr
            reserve-item.shadow(v-for='rcd in reserves' :key='rcd.id' v-bind='rcd')

</template>

<script>
import _ from 'lodash'
import FormReserve from "~/components/FormReserve";
import Card from "~/components/Card";
import ReserveItem from "~/components/ReserveItem";

export default {
  name: "HomePage",
  components: {
    Card,
    ReserveItem,
    FormReserve
  },
  data() {
    return {
      formDate: null,
      formData: {
        organization: "",
        description: "",
        room: "",
        start: "",
        end: ""
      }
    };
  },
  methods: {
    clickReserve(date) {
      console.log("TCL: clickReserve -> _.values(this.formDate)", _.values(this.formDate))
      if (this.formDate != date) {
        this.formDate = date
      } else if (_.some(_.values(this.formData), _.isEmpty)) {
        for (const [k, v] of _.toPairs(this.formData)) {
          if (!v) {
            this.$buefy.toast.open({
              type: "is-danger",
              message: `ยังไม่ได้กรอก ${k}`
            })
            break;
          }
        }
      } else {
        const body = _.assign({date}, this.formData)
        console.log("TCL: clickReserve -> body", body)
        this.$axios.$post("/api/rooms", body).then(res => {
          console.log(res)
        })
      }
    }
  },
  watch: {
    formDate(val) {
      if (val && !this.$auth.loggedIn) {
        this.$buefy.toast.open({
          type: "is-danger",
          message: "ต้องเข้าระบบก่อน"
        });
        this.$router.push("/login");
      }
    },
    formData: {
      deep: true,
      handler() {
        console.log(this.formData)
      }
    }
  },
  asyncData() {
    return {
      records: [
        {
          date: "2019-08-13",
          reserves: [
            {
              start: "",
              end: "",
              date: "",
              room: "",
              title: "ประชุมลานเกียร์",
              status: "rejected",
              owner: "6031301721"
            },
            {
              start: "",
              end: "",
              date: "",
              room: "",
              title: "ประชุมลานเกียร์ 2",
              status: "approve",
              owner: "6031301721"
            },
            {
              start: "",
              end: "",
              date: "",
              room: "",
              title: "ประชุมลานเกียร์ 3",
              status: "pending",
              owner: "6031301721"
            }
          ]
        },
        { date: "2019-08-14", reserves: [] },
        { date: "2019-08-15", reserves: [] },
        { date: "2019-08-16", reserves: [] },
        { date: "2019-08-17", reserves: [] },
        { date: "2019-08-18", reserves: [] }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
section {
  background-color: whitesmoke;
}
#cards-section {
  overflow: auto;
  padding: 2rem 1.5rem;
  margin: 0rem;
  .cards {
    display: flex;
    padding: 0rem;
    flex-direction: row;
  }
}
hr {
  background-color: #717171;
  border: none;
  display: block;
  height: 1px;
  margin: 1.5rem 6rem;
}
.shadow {
  box-shadow: -1px 5px 8px 0px #0000002e;
}

#cards-section .overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #0000009e;
  top: 0;
  left: 0;
  z-index: 40;
  transition: all ease 1s;
}
</style>
