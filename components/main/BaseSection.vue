<script setup lang="ts">
defineProps({
    header: String,
})
</script>

<template>
    <section class="container mx-auto px-4 md:px-0">
        <h2 v-if="header" class="header-2 text-center mb-6">{{ header }}</h2>

        <slot/>
    </section>
</template>
