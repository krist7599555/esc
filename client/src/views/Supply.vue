<template>
  <Layout>
    <PageContainer>
      <div class="section content">
        <h1>ยืมพัสดุ</h1>
        <b-button>กฏการยืมคืน</b-button>
        <b-field>
          <b-table :data="supply">
            <template slot-scope="props">
              <b-table-column label="quantity">
                <b-numberinput
                  v-model="props.row.pick"
                  controls-position="compact"
                  :min="0"
                  :max="props.row.total - props.row.remain"
                ></b-numberinput>
              </b-table-column>
              <b-table-column field="label" label="label">{{ props.row.label }}</b-table-column>
              <b-table-column
                field="remain"
                label="remain"
                numeric
              >{{ props.row.remain }} / {{ props.row.total }}</b-table-column>
            </template>
          </b-table>
        </b-field>
        <b-field>
          <b-button :disabled="!pickedSupply.length" type="is-primary" @click="borrow">ยืม</b-button>
        </b-field>
      </div>
    </PageContainer>
  </Layout>
</template>

<script>
import ModalConfirmSupply from "../components/ModalConfirmSupply";
import ModalSupplyRule from "../components/ModalSupplyRule";
export default {
  mounted() {
    this.$modal.open({
      component: ModalSupplyRule,
      hasModalCard: true
    });
  },
  methods: {
    close() {
      console.log("CLOSE");
    },
    borrow() {
      if (this.pickedSupply.length) {
        this.$modal.open({
          canCancel: false,
          component: ModalConfirmSupply,
          hasModalCard: true,
          props: {
            data: this.pickedSupply
          },
          events: {
            confirm: () => {
              this.$toast.open({
                type: "is-success",
                message: "confirm"
              });
            },
            close: () => {
              console.log("knjhbgf");
              this.$toast.open({
                type: "is-warning",
                message: "cancel"
              });
            }
          }
        });
      } else {
        this.$toast.open({
          type: "is-danger",
          message: "no item select"
        });
      }
    }
  },
  data() {
    return {
      // showModalSupplyRule: true,
      supply: [
        { label: "ปากกา", remain: 3, total: 5 },
        { label: "ดินสอ", remain: 3, total: 5 },
        { label: "โปรเจคเตอร์", remain: 3, total: 5 },
        { label: "กรรไกร์", remain: 3, total: 5 },
        { label: "ยางลบ", remain: 3, total: 5 }
      ],
      columns: [
        {
          field: "label",
          label: "label"
        },
        {
          field: "remain",
          label: "remain",
          numeric: true
        },
        {
          field: "total",
          label: "total",
          numeric: true
        }
      ]
    };
  },
  computed: {
    pickedSupply() {
      return this.supply.filter(({ pick }) => pick && +pick > 0);
    }
  }
};
</script>

