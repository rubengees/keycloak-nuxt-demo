<template>
  <div>
    <span v-if="todos">Works! Todos: {{ todos }}</span>
    <span v-if="errorMessage">{{ errorMessage }}</span>
    <br />
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const todos = await $axios.get('/api/todos')

      return { todos: todos.data, errorMessage: null }
    } catch (e) {
      return { todos: null, errorMessage: e.message || e }
    }
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
      } catch (e) {
        this.errorMessage = e.message | e
      }

      this.$router.push('/login')
    }
  }
}
</script>
