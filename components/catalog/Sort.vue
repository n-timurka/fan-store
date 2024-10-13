<script setup lang="ts">
import { ProductsSortEnum } from '~/types/enums';

const modelValue = defineModel<ProductsSortEnum>()
const options = [
    { value: ProductsSortEnum.A_Z, title: 'A to Z' },
    { value: ProductsSortEnum.Z_A, title: 'Z to A' },
    { value: ProductsSortEnum.CHEAP_FIRST, title: 'Cheap First' },
    { value: ProductsSortEnum.CHEAP_LAST, title: 'Cheap Last' },
    { value: ProductsSortEnum.MOST_RATED, title: 'Most Rated' },
    { value: ProductsSortEnum.LESS_RATED, title: 'Less Rated' },
]
</script>

<template>
    <USelectMenu
        v-model="modelValue"
        :options="options"
        value-attribute="value"
        option-attribute="title"
        icon="i-heroicons-bars-3-bottom-right-20-solid" />
</template>
