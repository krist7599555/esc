<template lang='pug'>
div(style='height: -webkit-fill-available;')
  nav.navbar.header.has-shadow(role='navigation' aria-label='main navigation')
    .navbar-brand
      a.navbar-item(href='/')
        h1 ESC
      .navbar-burger
        span
        span
        span
    .navbar-menu.is-active
      .navbar-start
        a.navbar-item จองห้องประชุม
        //- a.navbar-item หน้าแรก
        //- .navbar-item.has-dropdown.is-hoverable
        //-   a.navbar-link More
        //-   .navbar-dropdown
        //-     a.navbar-item About
        //-     a.navbar-item Jobs
        //-     a.navbar-item Contact
        //-     hr.navbar-divider
        //-     a.navbar-item Report an issue
      .navbar-end
        template(v-if='$auth.loggedIn')
          .navbar-item: strong {{$auth.user.nameTH}} {{$auth.user.surnameTH}}
          .navbar-item
            .buttons
              a.button.is-light(@click='$auth.logout()') ออกระบบ
        template(v-else)
          .navbar-item
            .buttons
              nuxt-link.button.is-primary(to='/login') เข้าสู่ระบบ

  //- section.main-content.columns
    //- aside.column.is-2.section
      p.menu-label.is-hidden-touch.
        General
      ul.menu-list
        li(v-for='(item, key) of items' :key='key')
          nuxt-link.is-flex(:to='item.to' exact-active-class='is-active')
            b-icon(:icon='item.icon')
            span(style='margin-left: 6px; margin-top: 3px;') {{ item.title }}

    //- .container.column
  nuxt.


</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  }
}
</script>
