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
            <NuxtLink :to="{ name: 'products-slug', params: { slug: product.slug } }" class="font-semibold hover:border-b">
                {{ product.name }}
            </NuxtLink>
        </template>

        <section class="space-y-4">
            <AppProductImage :images="product.images" size="318px" />

            <div class="flex justify-between items-center space-x-4">
                <AppSizeCheck v-if="product.sizes" v-model="size" :options="product.sizes" class="grow" />
                <AppColorCheck v-if="product.colors" v-model="color" :options="product.colors" class="grow" />
            </div>

            <AppRating :value="product.rating" :max="5" />
        </section>

        <template #footer>
            <div class="flex justify-between items-center">
                <div class="text-lg font-semibold">&euro;{{ product.price }}</div>
                <div class="flex items-center space-x-2">
                    <small v-if="isProductInCart" class="text-rose-600">Already in cart</small>
                    <div class="w-28">
                        <UButton color="rose" variant="solid" size="lg" block @click="buyProduct">
                            Add to Cart
                        </UButton>
                    </div>
                </div>
            </div>
        </template>
    </UCard>
</template>
