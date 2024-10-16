<script setup lang="ts">
import type { CatalogFilters } from '~/types/catalogFilters';
import type { Category } from '~/types/category';
import { ProductsSortEnum } from '~/types/enums';
import type { ProductsResponse } from '~/types/productsResponse';

const { slug } = useRoute().params
const { data: category } = await useFetch<Category>(() => `/api/categories/${slug}`);
if (!category.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
    })
}
const categoryImage = `${useRequestURL()}/categories/${category.value.slug}.webp`
useHead({
  title: `${category.value.name} - Sports Merchandise | Sports Team Fan Store`,
  meta: [
    { name: 'description', content: category.value.description },
    { property: 'og:title', content: `${category.value.name} - Sports Merchandise | Sports Team Fan Store` },
    { property: 'og:description', content: `Check out the latest ${category.value.name} from your favorite team. Get the best gear for supporting your club!` },
    { property: 'og:image', content: categoryImage },
    { property: 'og:type', content: 'website' },
  ]
})

const page = ref(1)
const perPage = ref(8)
const sort = ref(ProductsSortEnum.A_Z)
const activeFilters = reactive<CatalogFilters>({
  colors: [],
  sizes: [],
  price: {
    min: 0,
    max: 1000,
  }
})

const { data, status } = await useLazyFetch<ProductsResponse>('/api/products', {
    query: {
      category: category.value.name,
      ...activeFilters,
      page,
      perPage,
      sort,
    },
    watch: [activeFilters, page, perPage, sort]
});
</script>

<template>
  <main class="container mx-auto my-8 px-8 md:px-0">
    <div class="md:flex justify-between items-center mb-8">
        <h1 class="header-2 mb-2 md:mb-2">
            {{ category?.name }}
        </h1>

        <CatalogFilters
          v-if="data"
          v-model="activeFilters"
          v-model:sort="sort"
          :filters="data.filters"
          class="md:basis-1/4" />
    </div>
      
    <div v-if="status === 'pending'" class="grid md:grid-cols-4 gap-6">
      <CatalogSkeleton v-for="i in perPage" :key="i" />
    </div>
    <UAlert v-else-if="!data || !data.products.length" title="Nothing was found..." />
    <template v-else>
      <div class="grid md:grid-cols-4 gap-6">
        <CatalogProductCard v-for="product in data.products" :key="product.id" :product="product" />
      </div>

      <div class="mt-8 flex justify-center">
        <UPagination
          v-model="page"
          :page-count="perPage"
          :total="data.total"
          :active-button="{ color: 'rose' }"
          size="md"
          show-last show-first />
      </div>
    </template>
  </main>
</template>
