import categories from "@/server/data/categories.json";

export default defineEventHandler(() => {
  return categories;
});
