<script setup lang="ts">
import type { Product } from '~/types/product';

const { slug } = useRoute().params

const { data: product } = await useLazyFetch<Product>(`/api/products/${slug}`);
if (!product.value) {
    throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  }) 
}

useHead({
  title: `${product.value.name} - Buy Now | Sports Team Fan Store`,
  meta: [
    { name: 'description', content: product.value.description },
    { property: 'og:title', content: `${product.value.name} - Buy Now | Sports Team Fan Store` },
    { property: 'og:description', content: product.value.description },
    // { property: 'og:image', content: product.value.image },
    { property: 'og:type', content: 'product' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${product.value.name} - Buy Now | Sports Team Fan Store` },
    { name: 'twitter:description', content: product.value.description },
    // { name: 'twitter:image', content: product.value.image }
  ]
});
</script>

<template>
    <main v-if="product">
        <h1>Product page</h1>
        {{ product }}
    </main>
</template>
