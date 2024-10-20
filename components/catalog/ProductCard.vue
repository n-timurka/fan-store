<script setup lang="ts">
import type { ProductColorEnum } from '~/types/enums';
import type { Product } from '~/types/product';

const props = defineProps<{
    product: Product;
}>();

const cartStore = useCartStore();
const { addToCart } = cartStore;
const { cart } = storeToRefs(cartStore)

const toast = useToast()

const size = ref<string>()
const color = ref<ProductColorEnum>()

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
    <UCard :ui="{ divide: 'divide-none', body: { padding: 'px-6 py-0 md:py-0' } }">
        <template #header>
            <h4 class="w-full truncate">
                <NuxtLink
                    :to="{ name: 'products-slug', params: { slug: product.slug } }"
                    class="px-2 md:p-0 text-xl md:text-base font-semibold hover:border-b">
                    {{ product.name }}
                </NuxtLink>
            </h4>
        </template>

        <section class="space-y-4">
            <AppProductImage :images="product.images" size="318px" />

            <div class="flex justify-between items-center space-x-4">
                <ProductSizeCheck v-if="product.sizes" v-model="size" :options="product.sizes" class="grow" />
                <ProductColorCheck v-if="product.colors" v-model="color" :options="product.colors" class="grow" />
            </div>

            <ProductRating :value="product.rating" :max="5" />
        </section>

        <template #footer>
            <div class="flex justify-between items-center px-2">
                <div class="text-xl font-semibold">&euro;{{ product.price }}</div>
                <div class="flex items-center space-x-2">
                    <ClientOnly>
                        <small v-if="isProductInCart" class="text-rose-600">Already in cart</small>
                    </ClientOnly>
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
