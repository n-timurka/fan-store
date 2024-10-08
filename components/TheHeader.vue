<script setup lang="ts">
const route = useRoute()

const cartStore = useCartStore()
const totalProducts = computed(() => cartStore.productsNumber)

const isCartOpen = ref(false)
</script>

<template>
    <header class="w-full bg-rose-600 text-rose-50">
      <div class="container py-4 px-4 md:px-0 md:mx-auto flex justify-between items-center">
        <NuxtLink
          to="/"
          class="font-semibold text-xl text-white hover:text-rose-100 flex items-center space-x-2"
        >
          <NuxtImg src="./images/logo.webp" width="40px" height="40px" />
          <span>FanStore</span>
        </NuxtLink>

        <div class="flex space-x-6 items-center">
          <nav class="flex space-x-2">
            <UButton color="white" variant="link" :to="{ name: 'categories-name', params: { name: 'kits' }}">Kits</UButton>
            <UButton color="white" variant="link" :to="{ name: 'categories-name', params: { name: 'accessories' }}">Accessories</UButton>
            <UButton color="white" variant="link" :to="{ name: 'categories-name', params: { name: 'clothing' }}">Clothing</UButton>
            <UButton color="white" variant="link" :to="{ name: 'categories-name', params: { name: 'equipment' }}">Equipment</UButton>
          </nav>

          <div v-if="route.name !== 'checkout'" class="flex space-x-2">
            <UChip :text="totalProducts" size="2xl" color="rose" :show="totalProducts > 0">
              <UButton
                color="rose"
                variant="soft"
                icon="i-heroicons-shopping-cart"
                :ui="{ rounded: 'rounded-full' }"
                @click="isCartOpen = true" />
            </UChip>
          </div>
        </div>
      </div>

      <TheCart v-model="isCartOpen" />
    </header>
</template>
