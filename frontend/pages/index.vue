<template>
  <div>
    <span v-if="todos">Works! Todos: {{ todos }}</span>
    <div v-else>{{ error }}</div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const todos = await $axios.get('/api/todos')

      return { todos: todos.data }
    } catch (e) {
      return { error: e.message || e }
    }
  }
}
</script>
