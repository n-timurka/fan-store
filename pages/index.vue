<script setup lang="ts">
import type { Product } from '~/types/product';

useHead({
  title: 'Sports Team Fan Store - Kits, Scarves, and More',
  meta: [
    { name: 'description', content: 'Buy official sports team kits, scarves, and merchandise. Shop for high-quality team apparel and accessories from your favorite club.' },
    { property: 'og:title', content: 'Sports Team Fan Store - Kits, Scarves, and More' },
    { property: 'og:description', content: 'Explore our collection of official sports merchandise, including team kits, scarves, and accessories. Get ready to support your team!' },
    // { property: 'og:image', content: 'https://your-site.com/images/home-og-image.jpg' }, // Replace with your image URL
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Sports Team Fan Store - Kits, Scarves, and More' },
    { name: 'twitter:description', content: 'Shop official sports merchandise. Find kits, scarves, and accessories from your favorite teams.' },
    // { name: 'twitter:image', content: 'https://your-site.com/images/home-twitter-card.jpg' } // Replace with your image URL
  ]
});

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
const categories = computed(() => {
    const categories: { title: string, value?: string }[] = [{ title: 'All', value: undefined }];

    if (filtersData.value) {
        filtersData.value.categories.forEach(category => {
            categories.push({
                title: category,
                value: category,
            });
        })
    }
    
    return categories;
});
</script>

<template>
    <main class="container mx-auto my-8 px-4 md:px-0">
        <div class="md:flex justify-between items-center mb-8">
            <h1 class="text-2xl font-semibold mb-4 md:mb-0">
                Products
            </h1>

            <div v-if="filtersData" class="md:basis-1/4 flex space-x-4 justify-between">
                <USelectMenu
                    v-model="filters.category"
                    :options="categories"
                    option-attribute="title"
                    value-attribute="value"
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
