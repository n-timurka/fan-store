<script setup lang="ts">
import type { Product } from '~/types/product';

const props = defineProps<{
    product: Product;
}>();

const { addToCart } = useCartStore();
const toast = useToast()

const options = ref({
    size: undefined,
    color: undefined,
});

const buyProduct = () => {
    addToCart(props.product)
    toast.add({ title: 'You`ve added product to the cart' })
}
</script>

<template>
    <UCard>
        <template #header>
            <NuxtLink :to="{ name: 'products-slug', params: { slug: product.slug } }" class="font-semibold">
                {{ product.name }}
            </NuxtLink>
        </template>

        <UCarousel
            v-if="product.images?.length"
            v-slot="{ item }"
            :items="product.images"
            :ui="{ item: 'basis-full' }"
            class="overflow-hidden mb-4"
            :arrows="product.images?.length > 1">
            <NuxtImg :src="item" width="318px" height="318px" format="webp" densities="x1" />
        </UCarousel>
        <USkeleton v-else class="h-80 w-full mb-4" />

        <div class="flex justify-between items-center space-x-4">
            <USelectMenu v-model="options.size" :options="product.sizes" placeholder="Size" class="grow" />
            <USelectMenu v-model="options.color" :options="product.colors" placeholder="Color" class="grow" />
        </div>

        <template #footer>
            <div class="flex justify-between items-center">
                <div class="text-lg">{{ product.price }} &euro;</div>
                <div class="basis-1/4">
                    <UButton color="rose" variant="solid" size="lg" block @click="buyProduct">
                        Buy
                    </UButton>
                </div>
            </div>
        </template>
    </UCard>
</template>
