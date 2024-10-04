<script setup lang="ts">
import type { Product } from '~/types/product';

defineProps<{
    product: Product;
}>();

const options = ref({
    size: null,
    color: null,
});
</script>

<template>
    <UCard>
        <template #header>
            <NuxtLink :to="{ name: 'products-slug', params: { slug: product.slug } }" class="font-semibold">
                {{ product.name }}
            </NuxtLink>
        </template>

        <USkeleton class="h-64 w-full mb-4" />

        <div class="flex justify-between items-center space-x-4">
            <USelectMenu v-model="options.size" :options="product.sizes" placeholder="Size" class="grow" />
            <USelectMenu v-model="options.color" :options="product.colors" placeholder="Color" class="grow" />
        </div>

        <template #footer>
            <div class="flex justify-between items-center">
                <div class="text-lg">{{ product.price }} &euro;</div>
                <div class="basis-1/4">
                    <UButton color="rose" variant="solid" size="lg" block>Buy</UButton>
                </div>
            </div>
        </template>
    </UCard>
</template>
