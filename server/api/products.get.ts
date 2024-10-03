import products from "@/server/data/products.json";

export default defineEventHandler(async (event) => {
  const { category } = getQuery(event);

  return category
    ? products.filter((product) => product.category === category)
    : products;
});
