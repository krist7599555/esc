<template>
  <div>
    <div class="modal-card" style="width: auto; min-width: 360px">
      <header class="modal-card-head">
        <p class="modal-card-title">เข้าสู่ระบบ</p>
      </header>
      <section class="modal-card-body">
        <b-message
          v-show="errorMessage"
          type="is-danger"
          has-icon
          icon-size="is-small"
        >{{errorMessage}}</b-message>

        <b-field label="รหัสนิสิต 10 หลัก">
          <b-input type="text" v-model="form.username" placeholder="6x3xxxxx21" required></b-input>
        </b-field>

        <b-field label="รหัสผ่าน">
          <b-input
            type="password"
            v-model="form.password"
            password-reveal
            placeholder="รหัสเหมือน reg chula"
            required
            @keyup.enter.native="submit"
          ></b-input>
        </b-field>

        <b-checkbox>Remember me</b-checkbox>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close">ปิด</button>
        <button
          class="button is-primary"
          :class="{'is-loading': loading}"
          @click="submit"
        >เข้าสู่ระบบ</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { state, value, watch } from "vue-function-api";

export default {
  setup(_, { root, parent }) {
    const form = state({ username: "", password: "" });
    const loading = value(false);
    const errorMessage = value("");
    const submit = () => {
      if (!loading.value) {
        loading.value = true;
        root.$store
          .dispatch("auth/login", form)
          .then(parent.close)
          .catch(err => (errorMessage.value = err.message))
          .finally(() => (loading.value = false));
      }
    };

    watch(() => form, () => (errorMessage.value = ""), { deep: true });
    return { form, errorMessage, submit, loading };
  }
};
</script>

