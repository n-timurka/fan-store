import products from "@/server/data/products.json";

export default defineEventHandler(async (event) => {
  const { category, sizes, colors } = getQuery(event);

  return products.filter((product) => {
    // Check category filter
    const categoryMatch = category ? product.category === category : true;

    // Check sizes filter (if sizes are provided, check if the product has any of those sizes)
    const sizeMatch = sizes
      ? Array.isArray(sizes)
        ? sizes.some((size: string) => product.sizes.includes(size))
        : product.sizes.includes(sizes as string)
      : true;

    // Check colors filter (if colors are provided, check if the product has any of those colors)
    const colorMatch = colors
      ? Array.isArray(colors)
        ? colors.some((color: string) => product.colors.includes(color))
        : product.colors.includes(colors as string)
      : true;

    // Return true if all conditions match
    return categoryMatch && sizeMatch && colorMatch;
  });
});
