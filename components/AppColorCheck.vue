<script setup lang="ts">
import type { ProductColorEnum } from '~/types/enums';
import { productColorCodes } from '~/types/productColors';

const modelValue = defineModel<ProductColorEnum>()
const props = defineProps<{
    options: ProductColorEnum[],
}>()

const optionsList = computed(() => props.options.map(option => ({
    value: option,
    label: productColorCodes[option],
})))
</script>

<template>
    <div class="flex space-x-1 items-center">
        <URadio v-for="color of optionsList" :key="color.value" v-model="modelValue" :value="color.value" :ui="{ container: 'hidden' }">
            <template #label>
                <span
                    class="ring-2 ring-offset-2 h-6 w-6 rounded-full inline-flex cursor-pointer border-1"
                    :class="[color.value === modelValue ? 'ring-rose-600' : 'ring-transparent' ]"
                    :style="{ backgroundColor: color.label }" />
            </template>
        </URadio>
    </div>
</template>
