<script setup lang="ts">
const modelValue = defineModel<string>()
defineProps<{
    options: string[],
}>()
</script>

<template>
    <div class="flex space-x-2">
        <UButton
         v-for="size in options"
            :key="size"
            :color="size === modelValue ? 'rose' : 'white'"
            variant="solid"
            @click="modelValue = size">
            {{ size }}
        </UButton>
    </div>
</template>
