<script setup lang="ts">
const steps = [
  {
    title: 'Choose',
    description: 'Browse through our wide selection of team merchandise and select your favorite products.',
    icon: 'i-heroicons-shopping-cart'
  },
  {
    title: 'Purchase',
    description: 'Add the items you like to your shopping cart and proceed to checkout when you\'re ready.',
    icon: 'i-heroicons-clipboard-document-check'
  },
  {
    title: 'Pay',
    description: 'Use our secure payment options to complete your purchase safely and quickly.',
    icon: 'i-heroicons-credit-card'
  },
  {
    title: 'Enjoy',
    description: 'Receive your order and start supporting your team with official merchandise.',
    icon: 'i-heroicons-face-smile'
  }
];
</script>

<template>
    <MainBaseSection header="How to Use">
        <div class="md:flex justify-center items-center md:space-x-12 space-y-8 md:space-y-0">
          <div v-for="step in steps" :key="step.title" class="text-center">
            <UIcon :name="step.icon" class="w-24 h-24" />
            <h4 class="header-4">{{ step.title }}</h4>
            <p class="text-sm text-slate-400">{{ step.description }}</p>
          </div>
        </div>
    </MainBaseSection>
</template>