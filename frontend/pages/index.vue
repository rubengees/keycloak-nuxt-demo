<template>
  <div>
    <span v-if="todos">Works! Todos: {{ todos }}</span>
    <span v-if="errorMessage">{{ errorMessage }}</span>
    <br />
    <button @click="fetchNewTodos">Fetch new todos</button>
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
    async fetchNewTodos() {
      this.todos = null
      this.errorMessage = null

      try {
        const response = await this.$axios.get('/api/todos')

        this.todos = response.data
      } catch (e) {
        this.errorMessage = e.message || e
      }
    },
    async logout() {
      try {
        await this.$auth.logout()
      } catch (e) {
        this.errorMessage = e.message || e
      }

      this.$router.push('/login')
    }
  }
}
</script>
