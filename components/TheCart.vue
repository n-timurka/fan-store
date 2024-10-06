<script setup lang="ts">
const isOpen = defineModel<boolean>();

const cartStore = useCartStore()
const { addToCart, removeFromCart } = cartStore;
const { cart, totalCost } = storeToRefs(cartStore)

const navitageToCheckout = async () => {
    isOpen.value = false
    await navigateTo({ name: 'checkout' })
}
</script>

<template>
    <USlideover v-model="isOpen">
        <UCard
            class="flex flex-col flex-1"
            :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
        >
            <template #header>
                <div class="flex justify-between items-center">
                    <h2 class="text-xl font-semibold">Cart</h2>
                    <UButton
                        color="gray"
                        variant="ghost"
                        size="sm"
                        icon="i-heroicons-x-mark-20-solid"
                        square
                        padded
                        @click="isOpen = false" />
                </div>
            </template>
        
            <div class="grow space-y-4">
                <UAlert
                    v-if="!cart.length"
                    color="rose"
                    variant="soft"
                    title="Your cart is empty!"
                    description="Return to store and find something to yourself!"
                />
                <div v-for="item in cart" :key="item.product.id" class="w-full flex space-x-4 items-center">
                    <NuxtImg :src="item.product.images[0]" width="128px" height="128px" format="webp" densities="x1" />
                    <div class="grow space-y-2">
                        <h4>{{ item.product.name }}</h4>
                        <div class="flex justify-between items-center space-x-2 text-lg">
                            <span>{{ item.product.price }} &euro;</span>
                            <div class="flex items-center space-x-2">
                                <UButton
                                    color="rose" variant="soft"
                                    :icon="item.quantity > 1 ? 'i-heroicons-minus-20-solid' : 'i-heroicons-trash-20-solid'"
                                    @click="removeFromCart(item.product)" />
                                <small>x{{ item.quantity }}</small>
                                <UButton color="rose" variant="soft" icon="i-heroicons-plus-20-solid" @click="addToCart(item.product)" />
                            </div>
                            <strong>{{ item.product.price * item.quantity }} &euro;</strong>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="flex items-center" :class="totalCost > 0 ? 'justify-between' : 'justify-end'">
                    <div v-if="totalCost > 0">
                        Total: <strong>{{ totalCost }} &euro;</strong>
                    </div>
                    <UButton class="order-last" color="rose" size="lg" :disabled="totalCost === 0" @click="navitageToCheckout">Checkout</UButton>
                </div>
            </template>
        </UCard>
    </USlideover>
</template>
