<script setup lang="ts">
const modelValue = defineModel<string>()
defineProps<{
    options: string[],
}>()
</script>

<template>
    <div class="flex space-x-2">
        <div v-for="size in options" :key="size" class="w-10">
            <UButton
                :color="size === modelValue ? 'rose' : 'white'"
                variant="solid"
                block
                @click="modelValue = size">
                {{ size }}
            </UButton>
        </div>
    </div>
</template>
