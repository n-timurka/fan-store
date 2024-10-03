<script setup lang="ts">
const filters = ref({
    category: [],
    colors: [],
    sizes: [],
});

const { data: products, status } = await useLazyFetch('/api/products', {
    query: filters,
    watch: [filters]
});
const { data } = await useFetch('/api/filters');
const { categories, sizes, colors } = data.value;
</script>

<template>
    <main class="container mx-auto my-8 px-4 md:px-0">
        <div class="md:flex justify-between items-center mb-8">
            <h1 class="text-2xl font-semibold mb-4 md:mb-0">Products</h1>

            <div class="md:basis-1/4 flex space-x-4 justify-between">
                <USelectMenu
                    v-model="filters.category"
                    :options="categories"
                    multiple
                    class="grow"
                    placeholder="Category" />
                <USelectMenu v-model="filters.sizes" :options="sizes" multiple placeholder="Size" class="grow" />
                <USelectMenu v-model="filters.colors" :options="colors" multiple placeholder="Color" class="grow" />
            </div>
        </div>
        
        <div v-if="status === 'pending'">Loading...</div>
        <div v-else class="grid md:grid-cols-4 gap-6">
            <AppProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
    </main>
</template>
