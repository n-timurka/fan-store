import categories from "@/server/data/categories.json";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  const category = categories.find((category) => category.slug === slug);
  if (!category) {
    throw createError({
      statusCode: 404,
      statusMessage: "Category not found!",
    });
  }

  return category;
});
