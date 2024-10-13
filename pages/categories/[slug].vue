<script setup lang="ts">
import type { Category } from '~/types/category';
import { ProductsSortEnum, type ProductColorEnum } from '~/types/enums';
import type { Product } from '~/types/product';

const { slug } = useRoute().params
const { data: category } = await useFetch<Category>(() => `/api/categories/${slug}`);
if (!category.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found'
    })
}

useHead({
  title: `${category.value.name} - Sports Merchandise | Sports Team Fan Store`,
  meta: [
    { name: 'description', content: category.value.description },
    { property: 'og:title', content: `${category.value.name} - Sports Merchandise | Sports Team Fan Store` },
    { property: 'og:description', content: `Check out the latest ${category.value.name} from your favorite team. Get the best gear for supporting your club!` },
    // { property: 'og:image', content: `https://your-site.com/images/${category}-og-image.jpg` }, // Use a generic or category-specific image
    { property: 'og:type', content: 'website' },
  ]
})

const colors = ref<ProductColorEnum[]>([])
const sizes = ref<string[]>([])
const page = ref(1)
const perPage = ref(8)
const sort = ref(ProductsSortEnum.A_Z)
const min = ref()
const max = ref()

type ProductsListResponse = {
  products: Product[],
  total: number,
  minPrice: number,
  maxPrice: number,
  filters: Record<string,string[]>,
}
const { data, status } = await useLazyFetch<ProductsListResponse>('/api/products', {
    query: {
      // category: category.value.name,
      min,
      max,
      colors,
      sizes,
      page,
      perPage,
      sort,
    },
    watch: [colors, sizes, page, perPage, sort, min, max]
});
</script>

<template>
    <main v-if="category" class="container mx-auto my-8 px-4 md:px-0">
        <div class="md:flex justify-between items-center mb-8">
            <h1 class="header-2 mb-0">
                {{ category.name }}
            </h1>

            <div v-if="data?.filters" class="md:basis-1/4 flex space-x-4 justify-between">
                <USelectMenu
                  v-if="data.filters.sizes.length"
                  v-model="sizes"
                  :options="data.filters.sizes"
                  multiple
                  placeholder="Size"
                  class="flex-1" />

                <CatalogColor
                  v-if="data.filters.colors.length"
                  v-model="colors"
                  :colors="data.filters.colors as ProductColorEnum[]"
                  class="w-28" />

                <CatalogPriceFilter
                  v-model:min="min"
                  v-model:max="max"
                  :min-price="data.minPrice"
                  :max-price="data.maxPrice"
                  class="flex-1" />

                <CatalogSort v-model="sort" class="flex-1" />
            </div>
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
