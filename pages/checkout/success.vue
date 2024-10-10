<script setup lang="ts">
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
})

const cartStore = useCartStore()
cartStore.clearCart()
</script>

<template>
  <main class="min-h-[60vh] mx-4 my-8 md:auto flex justify-center items-center">
    <div class="md:flex space-x-8 w-[42rem]">
      <div class="text-center">
        <UIcon name="i-heroicons-check-badge-20-solid" class="w-32 h-32 text-rose-600" />
      </div>
      
      <div>
        <h1 class="header-1">Order Confirmed!</h1>
        <p>Thank you for your purchase!</p>
        <p>Your order has been successfully placed and is being processed. We’ve sent you a confirmation email with the details of your order. You can expect your delivery soon. If you have any questions, feel free to contact our support team.</p>
        <p>Enjoy your new gear!</p>
        <UButton color="rose" icon="i-heroicons-arrow-left-20-solid" class="mt-8" to="/">Back to store</UButton>  
      </div>
    </div>
  </main>
</template>
