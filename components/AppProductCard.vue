<script setup lang="ts">
import type { Product } from '~/types/product';

const props = defineProps<{
    product: Product;
}>();

const cartStore = useCartStore();
const { addToCart } = cartStore;
const { cart } = storeToRefs(cartStore)

const toast = useToast()

const size = ref<string>()
const color = ref<string>()

watch(
    () => props.product,
    () => {
        if (props.product.sizes && props.product.sizes.length) {
            size.value = props.product.sizes[0]
        }
        if (props.product.colors && props.product.colors.length) {
            color.value = props.product.colors[0]
        }
    },
    { immediate: true }
)

const buyProduct = () => {
    addToCart({
        product: props.product,
        quantity: 1,
        options: {
            size: size.value,
            color: color.value,
        }
    })
    toast.add({ title: 'You`ve added product to the cart' })
}

const isProductInCart = computed(() => cart.value.some(item => item.product.id === props.product.id))
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
            <AppSizeCheck v-if="product.sizes" v-model="size" :options="product.sizes" class="grow" />
            <USelectMenu v-if="product.colors" v-model="color" :options="product.colors" placeholder="Color" class="grow" />
        </div>

        <template #footer>
            <div class="flex justify-between items-center">
                <div class="text-lg">{{ product.price }} &euro;</div>
                <div class="flex items-center space-x-2">
                    <small v-if="isProductInCart" class="text-rose-600">Already in cart</small>
                    <div class="w-20">
                        <UButton color="rose" variant="solid" size="lg" block :disabled="isProductInCart" @click="buyProduct">
                            Buy
                        </UButton>
                    </div>
                </div>
            </div>
        </template>
    </UCard>
</template>
