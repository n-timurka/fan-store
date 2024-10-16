<script setup lang="ts">
import type { Product } from '~/types/product';

defineProps<{
    product: Product;
}>()
</script>

<template>
    <div class="p-6 rounded-lg hover:shadow-lg">
        <AppProductImage :images="product.images" size="318px" />

        <div class="flex justify-between items-stretch">
            <div class="grow">
                <NuxtLink :to="{ name: 'products-slug', params: { slug: product.slug } }" class="hover:border-b truncate">
                    {{ product.name }}
                </NuxtLink>

                <div class="font-semibold text-lg">&euro;{{ product.price }}</div>
            </div>
                
            <div class="w-12">
                <UButton
                    color="rose"
                    icon="i-heroicons-shopping-cart-20-solid"
                    block
                    class="h-full"
                    :to="{ name: 'products-slug', params: { slug: product.slug } }" />
            </div>
        </div>
    </div>
</template>
