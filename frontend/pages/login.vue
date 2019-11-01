<template>
  <div>Redirecting to login...</div>
</template>

<script>
export default {
  mounted() {
    if (!this.$auth.isloggedIn) {
      this.login()
    }
  },
  methods: {
    login() {
      return this.$auth.loginWith('social').catch((e) => {
        alert(e.message || e)
      })
    }
  }
}
</script>
