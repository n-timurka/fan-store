<script setup lang="ts">
import type { Category } from '~/types/category';

defineProps<{
    categories: Category[];
}>()
</script>

<template>
    <MainBaseSection header="Categories">
        <div class="flex md:flex-row flex-col md:space-x-8 space-y-4 md:space-y-0 md:justify-between items-center">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="{ name: 'categories-slug', params: { slug: category.slug } }"
            :style="{ backgroundImage: `url(/images/categories/${category.slug}.webp)` }"
            class="relative bg-cover bg-center md:flex-1 shadow-md rounded-lg w-[360px] h-[360px] overflow-hidden cursor-pointer hover:scale-110 hover:z-10 transition-all">
            <div class="absolute text-center inset-0 bg-slate-600/45 hover:bg-slate-600/65 transition-colors text-white flex flex-col justify-between py-8">
              <h3 class="header-3">{{ category.name }}</h3>
              <div class="flex justify-center">
                <UButton color="rose">Shop</UButton>
              </div>
            </div>       
          </NuxtLink>
        </div>
    </MainBaseSection>
</template>
