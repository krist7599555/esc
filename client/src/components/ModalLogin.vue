<template>
  <form @submit.prevent="submit">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">เข้าสู่ระบบ</p>
      </header>
      <section class="modal-card-body">
        <b-field label="รหัสนิสิต 10 หลัก">
          <b-input type="text" :value="username" placeholder="6x3xxxxx21" required></b-input>
        </b-field>

        <b-field label="รหัสผ่าน">
          <b-input
            type="password"
            :value="password"
            password-reveal
            placeholder="รหัสเหมือน reg chula"
            required
          ></b-input>
        </b-field>

        <b-checkbox>Remember me</b-checkbox>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$emit('close')">Close</button>
        <button class="button is-primary" type="submit">เข้าสู่ระบบ</button>
      </footer>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    submit() {
      const body = {
        username: this.username,
        password: this.password
      };
      this.$emit("submit", body);
      axios
        .post("/api/login", body)
        .then(res => {
          alert("OK");
          console.log("OK", res);
          this.$emit("close");
        })
        .catch(err => {
          alert("BAD");
          console.error(err);
        });
    }
  }
};
</script>

