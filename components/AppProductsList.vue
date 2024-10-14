<script setup lang="ts">
import type { PropType } from 'vue';
import type { Product } from '~/types/product';

defineProps({
    products: {
        type: Array as PropType<Product[]>,
        default: () => [],
    },
    label: {
        type: String,
        default: null,
    }
})
</script>

<template>
    <section class="md:flex md:space-x-6 space-y-8 md:space-y-0">
        <div v-for="product in products" :key=product.id class="basis-1/4 px-6">
            <AppProductImage :images="product.images" size="318px" />

            <div class="flex justify-between items-stretch">
                <div>
                    <NuxtLink :to="{ name: 'products-slug', params: { slug: product.slug } }" class="hover:border-b">
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
    </section>
</template>
