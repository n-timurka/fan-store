import products from "@/server/data/products.json";

export default defineEventHandler((_) => {
  const categories = products.map((product) => product.category);

  return [...new Set(categories)];
});
