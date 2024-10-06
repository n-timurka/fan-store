import products from "@/server/data/products.json";

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");

  return products.find((product) => product.slug === slug);
});
