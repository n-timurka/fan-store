<script setup lang="ts">
import type { ProductColorEnum } from '~/types/enums';
import { productColorCodes } from '~/types/productColors';

const modelValue = defineModel<ProductColorEnum[]>()

defineProps<{
    colors: ProductColorEnum[],
}>()
</script>

<template>
    <USelectMenu v-model="modelValue" :options="colors" multiple placeholder="Color" class="w-24">
        <template #option="{ option }">
            <span class="h-4 w-4 rounded-full inline-flex" :style="{ backgroundColor: productColorCodes[option as ProductColorEnum] }" aria-hidden="true" />
            <span class="truncate">{{ option }}</span>
        </template>
    </USelectMenu>
</template>
