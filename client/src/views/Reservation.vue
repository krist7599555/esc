<template>
  <div>
    <Layout>
      <!-- <PageContainer> -->
      <div class="hero is-fullwidth is-white">
          <!-- <h1 class="title">Reservation</h1> -->
          <div>
            <EscCalenda :events="events" @event-created="eventDrop" :resources="resources" />
          </div>
      </div>
      <!-- <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea alias velit fuga a rem explicabo ad ab amet corrupti. Tempora minus incidunt autem praesentium sit quam reiciendis voluptatem exercitationem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea alias velit fuga a rem explicabo ad ab amet corrupti. Tempora minus incidunt autem praesentium sit quam reiciendis voluptatem exercitationem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea alias velit fuga a rem explicabo ad ab amet corrupti. Tempora minus incidunt autem praesentium sit quam reiciendis voluptatem exercitationem!</div>
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea alias velit fuga a rem explicabo ad ab amet corrupti. Tempora minus incidunt autem praesentium sit quam reiciendis voluptatem exercitationem!</div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ea alias velit fuga a rem explicabo ad ab amet corrupti. Tempora minus incidunt autem praesentium sit quam reiciendis voluptatem exercitationem!</div>-->
      <!-- </PageContainer> -->
    </Layout>
    <b-modal :active.sync="showingReservationForm" has-modal-card>
      <ModalReservation></ModalReservation>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment";
import ModalReservation from "../components/ModalReservation";
import EscCalenda from "../components/Calendar/EscCalendarMobile";

export default {
  name: "reservation",
  components: { ModalReservation, EscCalenda },
  data() {
    return {
      showingReservationForm: false,
      resources: [
        { id: "a", title: "Room A" },
        { id: "b", title: "Room B", eventColor: "green" },
        { id: "c", title: "Room C", eventColor: "orange" },
        { id: "d", title: "Room D", eventColor: "red" }
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
    eventDrop(event) {
      console.log(event);
      console.log(event.start.toISOString());
      console.log(event.end.toISOString());
      this.showingReservationForm = true;
      this.$toast.open({
        message: `create event`
      });
    }
  }
};
</script>

<style scoped>
  .hero {
    padding: 1rem 2rem;
  }
</style>
