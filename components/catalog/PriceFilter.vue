<script setup lang="ts">
const min = defineModel<number>('min')
const max = defineModel<number>('max')

defineProps<{
    minPrice: number;
    maxPrice: number;
}>()
</script>

<template>
    <UPopover>
        <UButton color="white" label="Price" trailing-icon="i-heroicons-chevron-down-20-solid" />

        <template #panel>
            <div class="p-4">        
                <div class="flex space-x-2 mb-2">
                    <UInput v-model="min" type="number" class="w-28" :min="minPrice" :max="max">
                        <template #trailing>
                            <span class="text-gray-500 dark:text-gray-400 text-xs">EUR</span>
                        </template>
                    </UInput>
                    <UInput v-model="max" type="number" class="w-28" :min="min" :max="maxPrice">
                        <template #trailing>
                            <span class="text-gray-500 dark:text-gray-400 text-xs">EUR</span>
                        </template>
                    </UInput>
                </div>
                <p class="text-center text-sm">&euro;{{ minPrice }} to &euro;{{ maxPrice }}</p>
            </div>
        </template>
    </UPopover>
</template>