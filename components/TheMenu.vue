<script setup lang="ts">
const isMenuOpen = ref(false)

const categoriesStore = useCategoriesStore()
const links = computed(() => categoriesStore.categories?.map(category => ({
    label: category.name,
    to: { name: 'categories-slug', params: { slug: category.slug } },
})))
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
            :ui="{
                base: 'text-white hover:text-white hover:before:bg-rose-500',
                active: 'after:bg-transparent before:bg-rose-400 hover:before:bg-rose-400',
            }" />
    </nav>
</template>