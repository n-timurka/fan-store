<script setup lang="ts">
import type { Product } from '~/types/product';

const filters = ref({
    category: undefined,
    colors: [],
    sizes: [],
});

const { data: products, status } = await useLazyFetch<Product[]>('/api/products', {
    query: filters,
    watch: [filters]
});
const { data: filtersData } = await useFetch('/api/filters');
</script>

<template>
    <main class="container mx-auto my-8 px-4 md:px-0">
        <div class="md:flex justify-between items-center mb-8">
            <h1 class="text-2xl font-semibold mb-4 md:mb-0">
                {{ $t('products') }}
            </h1>

            <div v-if="filtersData" class="md:basis-1/4 flex space-x-4 justify-between">
                <USelectMenu
                    v-model="filters.category"
                    :options="filtersData.categories"
                    class="grow"
                    placeholder="Category" />
                <USelectMenu v-model="filters.sizes" :options="filtersData.sizes" multiple placeholder="Size" class="grow" />
                <USelectMenu v-model="filters.colors" :options="filtersData.colors" multiple placeholder="Color" class="grow" />
            </div>
        </div>
        
        <div v-if="status === 'pending'">Loading...</div>
        <UAlert v-else-if="!products || !products.length" title="Nothing was found..." />
        <div v-else class="grid md:grid-cols-4 gap-6">
            <AppProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
    </main>
</template>
