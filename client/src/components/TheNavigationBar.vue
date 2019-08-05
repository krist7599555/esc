<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img
          src="https://esc.eng.chula.ac.th/assets/images/logo_dark.png"
          alt="ESC logo"
          height="28"
        />
      </a>
      <div
        class="navbar-burger burger"
        data-target="navbarExampleTransparentExample"
        @click="showNav = !showNav"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu" :class="{'is-active': showNav}">
      <div class="navbar-start">
        <a class="navbar-item" href="/">หน้าแรก</a>
        <div class="navbar-item has-dropdown is-hoverable">
          <span class="navbar-link" href>เพิ่มเติม</span>
          <div class="navbar-dropdown is-boxed">
            <a class="navbar-item" href="/reservation">จองห้องประชุม</a>
            <a class="navbar-item" href="/docs">เอกสาร</a>
            <hr class="navbar-divider" />
            <a class="navbar-item" href="/supply">พัสดุ</a>
            <a class="navbar-item is-active" href>ทะเบียน</a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field is-grouped">
            <!-- <p class="control">
              <a
                class="bd-tw-button button"
                data-social-network="Twitter"
                data-social-action="tweet"
                data-social-target="http://localhost:4000"
                target="_blank"
                href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=http://localhost:4000&amp;via=jgthms"
              >
                <span class="icon">
                  <i class="fab fa-twitter"></i>
                </span>
                <span>Tweet</span>
              </a>
            </p>-->
            <p class="control">
              <a class="button is-primary" @click="login">
                <!-- <span class="icon">
                  <i class="fas fa-download"></i>
                </span>-->
                <span>เข้าสู่ระบบ</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import ModalLogin from "./ModalLogin";
export default {
  data() {
    return {
      showNav: false,
      popupLogin: false
    };
  },
  methods: {
    login() {
      this.$modal.open({
        component: ModalLogin,
        hasModalCard: true
      });
    }
  }
};
</script>
