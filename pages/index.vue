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
</script>

<template>
    <main>
      <MainHeroSection />

      <section class="container mx-auto my-8 px-4 md:px-0">
        <h2 class="header-2">Categories</h2>
        {{ categories }}
      </section>

      <section class="container mx-auto my-8 px-4 md:px-0">
        <h2 class="header-2">How to use</h2>
      </section>

      <section class="container mx-auto my-8 px-4 md:px-0">
        <h2 class="header-2">Popular products</h2>
      </section>
    </main>
</template>
