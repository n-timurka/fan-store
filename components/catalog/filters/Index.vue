<script setup lang="ts">
import type { CatalogFilters } from '~/types/catalogFilters';
import type { ProductColorEnum, ProductsSortEnum } from '~/types/enums';

defineProps<{
    filters: CatalogFilters;
}>()

const sort = defineModel<ProductsSortEnum>('sort')
const modelValue = defineModel<{
    sizes: string[];
    colors: ProductColorEnum[];
}>({ required: true })
</script>

<template>
    <div class="flex space-x-4 justify-end">
        <USelectMenu
            v-if="filters.sizes.length"
            v-model="modelValue.sizes"
            :options="filters.sizes"
            multiple
            placeholder="Size" />

        <CatalogFiltersColor
            v-if="filters.colors.length"
            v-model="modelValue.colors"
            :colors="filters.colors"
            class="w-28" />

        <!-- <CatalogFiltersPrice
            v-model:min="min"
            v-model:max="max"
            :min-price="data.minPrice"
            :max-price="data.maxPrice" /> -->

        <CatalogFiltersSort v-model="sort" />
    </div>
</template>
