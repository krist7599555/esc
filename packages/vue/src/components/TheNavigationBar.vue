<template lang='pug'>
nav.navbar(:class='{"is-hide": scroll == "down" && position > 70}')
  .navbar-brand
    a.navbar-item(href='/')
      img(src='~@/assets/logo_dark.png' alt='ESC logo' height='28')
    .navbar-burger.burger(data-target='navbarExampleTransparentExample' @click='showNav = !showNav')
      span
      span
      span
  .overlay(:class='{"is-hide": !showNav}' @click='showNav = false')
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
              b-dropdown.is-hidden-mobile(position='is-bottom-left' aria-role='menu')
                a.navbar-item(slot='trigger' role='button')
                  span Menu
                  b-icon(icon='menu-down')
                b-dropdown-item(custom aria-role='menuitem')
                  b {{user['nameEN']}} {{user.surnameEN}}
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

const scrollAPI = () => {
  let yOffset = 0;
  const scroll = value(null);
  const position = value(0);
  window.addEventListener("scroll", () => {
    if (yOffset < window.pageYOffset) scroll.value = "down";
    if (yOffset > window.pageYOffset) scroll.value = "up";
    position.value = yOffset = window.pageYOffset;
  });
  return { scroll, position };
};

export default {
  name: "the-navigation-bar",
  components: {
    ModalLogin
  },
  setup(props, { root }) {
    const user = computed(() => root.$store.getters["auth/user"]);
    const active = value(false);
    const login = () => (active.value = true);
    const logout = () => root.$store.dispatch("auth/logout");
    const sAPI = scrollAPI();
    return {
      ...sAPI,
      user,
      active,
      login,
      logout,
      showNav: false,
      popupLogin: false
    };
  }
};
</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  background-color: white;
  z-index: 2;
  width: 100%;
  height: 52px;
  transition: all 120ms ease-out;
  box-shadow: 0px -3px 14px #1006;
  &.is-hide {
    transform: translateY(-80px);
  }
}
.navbar-menu,
.navbar-brand {
  background-color: white;
}
.overlay {
  height: 100vh;
  width: 100%;
  background-color: #000a;
  position: absolute;
  z-index: -2;
  transition: all 50ms ease-in-out;
  &.is-hide {
    background-color: transparent;
    pointer-events: none;
  }
}
</style>
