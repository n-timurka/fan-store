<script setup lang="ts">
defineProps<{
    value: number,
    max: number,
}>()
</script>

<template>
    <section class="flex space-x-2 items-center">
        <div class="flex">
            <UIcon v-for="i in max" :key="i" :name="i > value ? 'i-heroicons-star' : 'i-heroicons-star-20-solid'" class="text-orange-400" />
        </div>

        <div class="text-sm">({{ value }} of {{ max }})</div>
    </section>
</template>
