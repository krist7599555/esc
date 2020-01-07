<template lang='pug'>
  .box.has-text-centered(v-if='$auth.loggedIn' style='padding: 2rem 3.5rem')
    h1 You alredy loggin as
    b.is-size-4 {{$auth.user.nameEN}} {{$auth.user.surnameEN}}
    br
    br
    b-field
      nuxt-link.button.is-primary(to='/') go to home
    b-field
      a.help(@click='$auth.logout()') or logout
  div(v-else)
    form.box(ref='loginBox' @submit.prevent='login')
      b-field(label='รหัสนิสิต 10 หลัก')
        b-input(v-model='username' type='number' required)
      b-field(label='รหัสเหมือน reg chula')
        b-input(v-model='password' type='password' required password-reveal)
      b-field
        b-button.is-primary(native-type="submit" :loading='loading') login
</template>

<script>
import gsap from 'gsap'
export default {
  layout: 'fullscreen',
  data() {
    return {
      username: "",
      password: "",
      loading: false
    }
  },
  mounted() {
    gsap.from(this.$refs.loginBox, {height: 0, y: -20, alpha: 0}, 1)
  },
  methods: {
    async login() {
      this.loading = true
      await this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password
        }
      }).catch(err => {
        this.$buefy.toast.open({
          type:"is-danger",
          message: err.response.data
        })
      })
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  width: 290px;
  overflow: hidden;
}
</style>
