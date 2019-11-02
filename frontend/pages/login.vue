<template>
  <div>
    <input v-model="username" type="text" placeholder="Username" />
    <input v-model="password" type="text" placeholder="Password" />
    <button @click="login">Login</button>
    <button @click="oauthLogin">OAuth login</button>
  </div>
</template>

<script>
import querystring from 'querystring'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      const form = {
        client_id: 'nuxt',
        username: this.username,
        password: this.password,
        grant_type: 'password'
      }

      return this.$auth
        .loginWith('local', {
          data: querystring.stringify(form),
          config: {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          }
        })
        .catch((e) => {
          alert(e.message || e)
        })
    },
    oauthLogin() {
      return this.$auth.loginWith('social').catch((e) => {
        alert(e.message || e)
      })
    }
  }
}
</script>
