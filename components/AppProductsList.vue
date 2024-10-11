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
    <section>
        <h3 v-if="label" class="mb-4 font-semibold text-lg">{{ label }}</h3>

        <div class="flex space-x-6">
            <div v-for="product in products" :key=product.id class="basis-1/4 p-8">
                <AppProductImage :images="product.images" size="318px" />
                <div class="flex justify-between items-stretch">
                    <div>
                        <NuxtLink :to="{ name: 'products-slug', params: { slug: product.slug } }" class="hover:border-b">{{ product.name }}</NuxtLink>
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
        </div>
    </section>
</template>
