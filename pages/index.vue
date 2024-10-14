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
    <main class="flex flex-col space-y-8 md:space-y-20 mb-20">
      <MainHeroSection />

      <section class="container mx-auto px-4 md:px-0">
        <h2 class="header-2 text-center mb-6">Categories</h2>

        <div class="flex md:flex-row flex-col md:space-x-8 space-y-4 md:justify-between">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="{ name: 'categories-slug', params: { slug: category.slug } }"
            :style="{ backgroundImage: `url(/images/categories/${category.slug}.webp)` }"
            class="relative bg-cover bg-center md:flex-1 shadow-md rounded-lg h-[360px] overflow-hidden cursor-pointer hover:scale-110 hover:z-10 transition-all">
            <div class="absolute text-center inset-0 bg-slate-600/45 hover:bg-slate-600/65 transition-colors text-white flex flex-col justify-between py-8">
              <h3 class="header-3">{{ category.name }}</h3>
              <div class="flex justify-center">
                <UButton color="rose">Shop</UButton>
              </div>
            </div>       
          </NuxtLink>
        </div>
      </section>

      <section class="container mx-auto px-4 py-8 md:px-0">
        <h2 class="header-2 text-center mb-8">How to use</h2>

        <div class="md:flex justify-center items-center md:space-x-12 space-y-8 md:space-y-0">
          <div class="text-center">
            <UIcon name="i-heroicons-shopping-cart" class="w-24 h-24" />
            <h4 class="header-4">Choose</h4>
            <p class="text-sm text-slate-400">Browse through our wide selection of team merchandise and select your favorite products</p>
          </div>
          <div class="text-center">
            <UIcon name="i-heroicons-clipboard-document-check" class="w-24 h-24" />
            <h4 class="header-4">Purchase</h4>
            <p class="text-sm text-slate-400">Add the items you like to your shopping cart and proceed to checkout when you're ready</p>
          </div>
          <div class="text-center">
            <UIcon name="i-heroicons-credit-card" class="w-24 h-24" />
            <h4 class="header-4">Pay</h4>
            <p class="text-sm text-slate-400">Use our secure payment options to complete your purchase safely and quickly</p>
          </div>
          <div class="text-center">
            <UIcon name="i-heroicons-face-smile" class="w-24 h-24" />
            <h4 class="header-4">Enjoy</h4>
            <p class="text-sm text-slate-400">Receive your order and start supporting your team with official merchandise</p>
          </div>
        </div>
      </section>

      <section v-if="data?.products" class="container mx-auto px-4 md:px-0">
        <h2 class="header-2 text-center mb-6">Popular products</h2>
        <AppProductsList :products="data?.products" />
      </section>
    </main>
</template>
