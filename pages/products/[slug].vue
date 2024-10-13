<script setup lang="ts">
import AppProductsList from '~/components/AppProductsList.vue';
import type { Product } from '~/types/product';

const { slug } = useRoute().params

const { data: product } = await useFetch<Product>(() => `/api/products/${slug}`);
if (!product.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
    })
}

const { data } = await useFetch('/api/products', {
  query: { category: product.value.category },
})
const relatedProducts = computed(() => data.value?.products.filter(p => p.id !== product.value?.id))

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
    // { property: 'og:image', content: product.value.image },
    { property: 'og:type', content: 'product' },
    // { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${product.value.name} - Buy Now | Sports Team Fan Store` },
    { name: 'twitter:description', content: product.value.description },
    // { name: 'twitter:image', content: product.value.image }
  ]
});
const links = computed(() => {
  if (!product.value) return []

  return [
    {
      label: 'Home',
      to: '/'
    },
    {
      label: product.value.category,
      to: { name: 'categories-slug', params: { slug: product.value.category } }
    },
    {
      label: product.value.name,
    }
  ]
})

const selectedSize = ref<string>()
const selectedColor = ref<string>()
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
            <h1 class="text-2xl font-semibold">{{ product.name }}</h1>
            <AppRating :value="product.rating" :max="5" />
          </div>

          <div>{{ product.description }}</div>
          <div class="text-2xl font-semibold">&euro;{{ product.price }}</div>

          <UDivider />
          <div class="flex">
            <div v-if="product.sizes" class="flex-1">
              <label>Available sizes:</label>
              <AppSizeCheck v-model="selectedSize" :options="product.sizes" />
            </div>
            <div v-if="product.colors" class="flex-1">
              <label>Available colors:</label>
              <AppColorCheck v-model="selectedColor" :options="product.colors" />
            </div>
          </div>
          <UDivider />

          <div class="flex space-x-4 items-center">
            <AppQuantity v-model="quantity" class="w-28" size="xl" />
            <UButton size="xl" color="rose" @click="buyProduct">Add to cart</UButton>
            <small v-if="isProductInCart" class="text-rose-600">Already items in cart: {{ productsNumberInCart }}</small>
          </div>
        </div>
      </section>

      <section>
        <AppProductsList :products="relatedProducts" label="Related products" />
      </section>
    </main>
</template>
