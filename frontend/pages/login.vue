<template>
  <div>
    <input v-model="username" type="text" placeholder="Username" />
    <input v-model="password" type="text" placeholder="Password" />
    <button @click="login">Login</button>
    <button @click="oauthLogin">OAuth login</button>
    <div v-if="errorMessage">
      <br />
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: null
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("refresh", {
          data: { username: this.username, password: this.password }
        })
      } catch (e) {
        this.errorMessage = e.message || e
      }
    },
    async oauthLogin() {
      try {
        await this.$auth.loginWith("social")
      } catch (e) {
        this.errorMessage = e.message || e
      }
    }
  }
}
</script>
