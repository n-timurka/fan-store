import products from "@/server/data/products.json";

export default defineEventHandler((_) => {
  const categories = new Set();
  const colors = new Set();
  const sizes = new Set();

  products.forEach((product) => {
    categories.add(product.category);
    product.colors.forEach((color) => colors.add(color));
    product.sizes.forEach((size) => sizes.add(size));
  });

  return {
    categories: [...categories],
    colors: [...colors],
    sizes: [...sizes],
  };
});
