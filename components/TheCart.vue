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
                <div v-for="item in cart" :key="item.product.id" class="relative w-full flex">
                    <UButton
                        icon="i-heroicons-x-mark-20-solid"
                        :ui="{ rounded: 'rounded-full' }"
                        color="rose" class="absolute -top-4 -left-4 z-10"
                        @click="removeFromCart(item)" />
                    <NuxtImg v-if="item.product.images.length" :src="item.product.images[0]" width="128px" height="128px" format="webp" densities="x1" />
                    <USkeleton v-else class="w-32 h-32" />

                    <div class="grow space-y-2 flex flex-col my-4 ml-4">
                        <div class="grow">
                            <h4 class="font-semibold">{{ item.product.name }}</h4>
                            <div v-if="item.options" class="text-sm">
                                <div v-if="item.options.size">Size: {{ item.options.size }}</div>
                                <div v-if="item.options.color">Color: {{ item.options.color }}</div>
                            </div>
                        </div>
                        
                        <div class="flex justify-between items-center space-x-2 text-lg">
                            <span>{{ item.product.price }} &euro;</span>
                            <div class="flex items-center space-x-2">
                                <UButton
                                    color="rose"
                                    variant="soft"
                                    icon="i-heroicons-minus-20-solid"
                                    @click="removeFromCart(item)" />
                                <small>x{{ item.quantity }}</small>
                                <UButton color="rose" variant="soft" icon="i-heroicons-plus-20-solid" @click="addToCart(item)" />
                            </div>
                            <strong>{{ item.product.price * item.quantity }} &euro;</strong>
                        </div>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="flex items-center" :class="totalCost > 0 ? 'justify-between' : 'justify-end'">
                    <div v-if="totalCost > 0">
                        Total: <strong>{{ totalCost.toFixed(2) }} &euro;</strong>
                    </div>
                    <UButton class="order-last" color="rose" size="lg" :disabled="totalCost === 0" @click="navitageToCheckout">Checkout</UButton>
                </div>
            </template>
        </UCard>
    </USlideover>
</template>
