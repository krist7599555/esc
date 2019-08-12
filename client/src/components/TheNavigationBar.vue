<template lang='pug'>
nav.navbar.is-transparent
  .navbar-brand
    a.navbar-item(href='/')
      img(src='~@/assets/logo_dark.png' alt='ESC logo' height='28')
    .navbar-burger.burger(data-target='navbarExampleTransparentExample' @click='showNav = !showNav')
      span
      span
      span
  .navbar-menu(:class="{'is-active': showNav}")
    .navbar-start
      a.navbar-item(href='/') หน้าแรก
      .navbar-item.has-dropdown.is-hoverable
        span.navbar-link(href) เพิ่มเติม
        .navbar-dropdown.is-boxed
          a.navbar-item(href='/reservation') จองห้องประชุม
          a.navbar-item(href='/docs') เอกสาร
          hr.navbar-divider
          a.navbar-item(href='/supply') พัสดุ
          a.navbar-item.is-active(href) ทะเบียน
    .navbar-end
      .navbar-item
        .field.is-grouped
            template(v-if="!user")
              p.control
                a.button.is-primary(@click='login')
                  b-icon(icon='sign-in-alt')
                  span เข้าสู่ระบบ
            template(v-else)
              b-dropdown.is-hidden-mobile(v-model='navigation' position='is-bottom-left' aria-role='menu')
                a.navbar-item(slot='trigger' role='button')
                  span Menu
                  b-icon(icon='menu-down')
                b-dropdown-item(custom aria-role='menuitem')
                  b {{user.nameEN}} {{user.surnameEN}}
                  br
                  span {{user.facultyEN}}

                hr.dropdown-divider
                b-dropdown-item(value='profile')
                  b-icon(icon='user')
                  span Profile

                b-dropdown-item(value='settings')
                  b-icon(icon='settings')
                  span Settings

                b-dropdown-item(value='logout' aria-role='menuitem' @click='logout')
                  b-icon(icon='sign-out-alt')
                  span Logout

              a.button.is-primary.is-hidden-tablet(@click='logout')
                b-icon(icon='sign-out-alt')
                span ออกจากระบบ

  b-modal(:active.sync='active' has-modal-card)
    modal-login
</template>

<script>
import ModalLogin from "./ModalLogin";
import { value, computed } from "vue-function-api";

export default {
  components: {
    ModalLogin
  },
  setup(_, { root }) {
    const user = computed(() => root.$store.getters["auth/user"] || null);
    const active = value(false);
    const login = () => (active.value = true);
    const logout = () => this.$store.dispatch("auth/logout");
    return {
      user,
      active,
      login,
      logout,
      showNav: value(false),
      popupLogin: value(false)
    };
  }
};

// const old = {
//   components: {
//     ModalLogin
//   },
//   data() {
//     return {
//       active: false,
//       showNav: false,
//       popupLogin: false
//     };
//   },
//   computed: {
//     user() {
//       return this.$store.getters["auth/user"] || null;
//     }
//   },
//   methods: {
//     login() {
//       this.active = true;
//     },
//     logout() {
//       this.$store.dispatch("auth/logout");
//     }
//   }
// };
</script>
