<script setup lang="ts">
const filters = ref({
    category: [],
});

const { data: products, status } = await useLazyFetch('/api/products', {
    query: filters,
    watch: [filters]
});
const { data: categories } = await useFetch('/api/categories');
</script>

<template>
    <main class="container mx-auto my-6 px-4 md:px-0">
        <div class="flex justify-between items-center mb-6">
            <h1>Products</h1>

            <div>
                <USelectMenu v-model="filters.category" :options="categories" multiple placeholder="Category" />
            </div>
        </div>
        <div v-if="status === 'pending'">Loading...</div>
        <div v-else class="grid md:grid-cols-4 gap-6">
            <AppProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
    </main>
</template>
