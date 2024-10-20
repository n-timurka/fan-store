<script setup lang="ts">
useHead({
  title: 'Sports Team Fan Store - Kits, Scarves, and More',
  meta: [
    { name: 'description', content: 'Buy official sports team kits, scarves, and merchandise. Shop for high-quality team apparel and accessories from your favorite club.' },
    { property: 'og:title', content: 'Sports Team Fan Store - Kits, Scarves, and More' },
    { property: 'og:description', content: 'Explore our collection of official sports merchandise, including team kits, scarves, and accessories. Get ready to support your team!' },
    // { property: 'og:image', content: 'https://your-site.com/images/home-og-image.jpg' }, // Replace with your image URL
    { property: 'og:type', content: 'website' },
  ]
});

const categoriesStore = useCategoriesStore()
const { categories } = storeToRefs(categoriesStore)

const { data } = await useFetch('/api/products', {
  query: { page: 1, perPage: 4 },
})
</script>

<template>
    <main class="flex flex-col space-y-10 md:space-y-20 mb-20">
      <MainHero />

      <MainCategories v-if="categories" :categories="categories" />

      <MainHowTo />

      <MainProducts v-if="data && data.products" :products="data.products" />
    </main>
</template>
