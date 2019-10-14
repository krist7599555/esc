<template>
  <Layout>
    <PageContainer>
      <div v-if="user" class="section content" style="min-width: 250px">
        <br />
        <p>{{user.ouid}}</p>
        <p>{{user.nameEN}} {{user.surnameEN}}</p>
        <p>{{user.facultyEN}}</p>
        <br />
        <p>{{user.nameTH}} {{user.surnameTH}}</p>
        <p>{{user.facultyTH}}</p>
      </div>
      <div>
        <!-- <b-icon icon="circle-notch" custom-class="fa-spin"></b-icon>
        <b-icon icon="cog" class="fa-spin"></b-icon>-->
      </div>
    </PageContainer>
  </Layout>
</template>

<script>
import { value, onMounted } from "vue-function-api";
import axios from "axios";

export default {
  name: "profile",
  setup() {
    const user = value(null);
    onMounted(async () => {
      axios.get("/api/profile").then(res => {
        user.value = res.data;
      });
    });
    return {
      user
    };
  }
};
</script>
