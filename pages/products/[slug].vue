<script setup lang="ts">
import type { ProductColorEnum } from '~/types/enums';
import type { Product } from '~/types/product';
import type { ProductsResponse } from '~/types/productsResponse';
// import { generateClient } from "aws-amplify/data";
// import type { Schema } from "@/amplify/data/resource";

// const client = generateClient<Schema>();
// const { data: products } = await client.models.Product.list()

const { slug } = useRoute().params
const { data: product } = await useFetch<Product>(() => `/api/products/${slug}`);
if (!product.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
    })
}

const { data: products } = await useFetch<ProductsResponse>('/api/products', {
  query: { category: product.value.category, page: 1, perPage: 4, notIn: [product.value.id] },
})
const relatedProducts = computed(() => products.value?.products.filter(p => p.id !== product.value?.id))

const toast = useToast()
const cartStore = useCartStore();
const { addToCart, productItemsNumber } = cartStore;
const { cart } = storeToRefs(cartStore)

const productsNumberInCart = computed(() => {
  if (!product.value) return

  return productItemsNumber(product.value.id)
});

useHead({
  title: `${product.value.name} - Buy Now | Sports Team Fan Store`,
  meta: [
    { name: 'description', content: product.value.description },
    { property: 'og:title', content: `${product.value.name} - Buy Now | Sports Team Fan Store` },
    { property: 'og:description', content: product.value.description },
    { property: 'og:image', content: product.value.images[0] },
    { property: 'og:type', content: 'product' },
  ]
});
const links = computed(() => {
  if (!product.value) return []

  return [
    { label: 'Home', to: '/' },
    {
      label: product.value.category,
      to: { name: 'categories-slug', params: { slug: product.value.category.toLowerCase() } },
    },
    { label: product.value.name }
  ]
})

const selectedSize = ref<string>()
const selectedColor = ref<ProductColorEnum>()
const quantity = ref(1)
  watch(
    () => product.value,
    () => {
        if (product.value?.sizes && product.value.sizes.length) {
          selectedSize.value = product.value.sizes[0]
        }
        if (product.value?.colors && product.value.colors.length) {
          selectedColor.value = product.value.colors[0]
        }
    },
    { immediate: true }
)

const buyProduct = () => {
  if (!product.value) return

  addToCart({
    product: product.value,
    quantity: quantity.value,
    options: {
      size: selectedSize.value,
      color: selectedColor.value,
      }
  })

  toast.add({ title: 'You`ve added product to the cart' })
}

const isProductInCart = computed(() => cart.value.some(item => item.product.id === product.value?.id))
</script>

<template>
  <main v-if="product" class="container mx-auto my-8 px-4 md:px-0 space-y-16">
    <section class="md:flex justify-between md:space-x-8 space-y-8 md:space-y-0">
      <div class="flex-1">
        <AppProductImage :images="product.images" size="752px" />
      </div>

      <div class="flex-1 space-y-8">
        <UBreadcrumb :links="links" :ui="{ active: 'text-rose-400' }" />

        <div>
          <h1 class="header-1 text-slate-800 mb-0">{{ product.name }}</h1>
          <ProductRating :value="product.rating" :max="5" />
        </div>

        <div>{{ product.description }}</div>
        <div class="text-2xl font-semibold">&euro;{{ product.price }}</div>

        <UDivider />
        <div class="flex">
          <div v-if="product.sizes" class="flex-1">
            <label class="text-sm text-slate-600">Available sizes:</label>
            <ProductSizeCheck v-model="selectedSize" :options="product.sizes" />
          </div>
          <div v-if="product.colors" class="flex-1">
            <label class="text-sm text-slate-600">Available colors:</label>
            <ProductColorCheck v-model="selectedColor" :options="product.colors" class="mt-2" />
          </div>
        </div>
        <UDivider />

        <div class="flex space-x-4 items-center">
          <ProductQuantity v-model="quantity" class="w-28" size="xl" />
          <UButton size="xl" color="rose" @click="buyProduct">Add to cart</UButton>
          <small v-if="isProductInCart" class="text-rose-600">Already items in cart: {{ productsNumberInCart }}</small>
        </div>
      </div>
    </section>

    <section v-if="relatedProducts">
      <h3 class="header-3 text-center mb-4">Similar products</h3>
      <div class="flex flex-col md:flex-row justify-center md:justify-start md:space-x-6 space-y-4 md:space-y-0">
        <AppProductCard v-for="p in relatedProducts" :key="p.id" :product="p" class="w-[366px]" />
      </div>
    </section>
  </main>
</template>
