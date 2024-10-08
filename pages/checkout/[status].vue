<script setup lang="ts">
definePageMeta({
  validate: async (route) => {
    return typeof route.params.status === 'string' && ['success', 'cancel'].includes(route.params.status)
  }
})

const route = useRoute()
</script>

<template>
    <main class="container mx-auto my-8 px-4 md:px-0">
        <h1>{{ route.params.status }}</h1>
        <p>{{ route.query.sessionId }}</p>
    </main>
</template>
