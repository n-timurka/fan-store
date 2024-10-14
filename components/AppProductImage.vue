<script setup lang="ts">
defineProps<{
    images: string[],
    size: string,
}>()
</script>

<template>
    <section>
        <UCarousel
            v-if="images.length"
            v-slot="{ item }"
            :items="images"
            :ui="{ item: 'basis-full' }"
            class="overflow-hidden mb-4"
            :arrows="images.length > 1">
            <NuxtImg :src="item" :width="size" :height="size" format="webp" densities="x1" />
        </UCarousel>
        <div v-else class="bg-slate-100 w-full mb-4 flex justify-center items-center" :class="`h-[${size}]`">
            <UIcon name="i-heroicons-no-symbol-20-solid" class="w-32 h-32 bg-slate-300" />
        </div>
    </section>
</template>
