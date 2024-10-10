<script setup lang="ts">
const isMenuOpen = ref(false)
const links = [
    {
        label: 'Kits',
        to: { name: 'categories-name', params: { name: 'kits' } },
    },
    {
        label: 'Accessories',
        to: { name: 'categories-name', params: { name: 'accessories' } },
    },
    {
        label: 'Clothing',
        to: { name: 'categories-name', params: { name: 'clothing' } },
    },
    {
        label: 'Equipment',
        to: { name: 'categories-name', params: { name: 'equipment' } },
    },
]
</script>

<template>
    <nav>
        <UPopover class="md:hidden" overlay>
            <UButton
                color="rose"
                variant="soft"
                icon="i-heroicons-bars-3-20-solid"
                :ui="{ rounded: 'rounded-full' }"
                @click="isMenuOpen = true" />

            <template #panel>
                <UVerticalNavigation :links="links" class="w-36" />
            </template>
        </UPopover>
    
        <UHorizontalNavigation
            :links="links"
            class="md:flex hidden"
            :ui="{ base: 'text-white hover:text-white hover:underline hover:before:bg-transparent' }" />
    </nav>
</template>