<script setup lang="ts">
import type { Product } from '~/types/product';

defineProps<{
    products: Product[];
}>()
</script>

<template>
    <MainBaseSection header="Popular Products">
        <div class="flex flex-col md:flex-row justify-center items-center md:space-x-6 space-y-4 md:space-y-0">
            <AppProductCard v-for="product in products" :key="product.id" :product="product" class="w-[22rem]" />
        </div>
    </MainBaseSection>
</template>
