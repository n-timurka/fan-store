import type { Category } from "~/types/category";

export const useCategoriesStore = defineStore("categories", () => {
  const categories = ref<Category[]>();

  const FetchCategories = async () => {
    const { data, error } = await useLazyFetch<Category[]>(`/api/categories`);

    if (error.value || !data.value) {
      throw createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
      });
    }

    categories.value = data.value;
  };

  return {
    categories,
    FetchCategories,
  };
});
