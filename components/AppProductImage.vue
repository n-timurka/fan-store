<script setup lang="ts">
defineProps<{
    images: string[],
    size: string,
}>()
</script>

<template>
    <section class="mb-4">
        <UCarousel
            v-if="images.length"
            v-slot="{ item }"
            :items="images"
            :ui="{ item: 'basis-full' }"
            class="overflow-hidden aspect-square"
            :arrows="images.length > 1">
            <NuxtImg :src="item" :width="size" :height="size" format="webp" densities="x1" :placeholder="[size, size]" loading="lazy" />
        </UCarousel>
        <div
            v-else
            class="bg-slate-100 flex justify-center items-center"
            :style="{ width: size, aspectRatio: '1 / 1' }">
            <UIcon name="i-heroicons-no-symbol-20-solid" class="w-32 h-32 bg-slate-300" />
        </div>
    </section>
</template>
