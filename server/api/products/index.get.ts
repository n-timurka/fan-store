import products from "@/server/data/products.json";
import { useS3Client } from "@/server/utils/s3";
import { ProductsSortEnum } from "~/types/enums";

export default defineEventHandler(async (event) => {
  const { category, sizes, colors, sort, page, perPage, min, max, notIn } =
    getQuery(event);

  const productsItems = category
    ? products.filter((product) => product.category === category)
    : products;

  // Save potential filters values
  const filters = { sizes: new Set(), colors: new Set() };
  productsItems.forEach((product) => {
    product.colors?.forEach((color) => filters.colors.add(color));
    product.sizes?.forEach((size) => filters.sizes.add(size));
  });

  // Filtration
  let filteredProducts = productsItems.filter((product) => {
    // Check if the product is in the `not in` list
    if (notIn && (notIn as number[]).includes(product.id)) return false;

    // Check sizes filter (if sizes are provided, check if the product has any of those sizes)
    const sizeMatch = sizes
      ? Array.isArray(sizes)
        ? sizes.some(
            (size: string) => product.sizes && product.sizes.includes(size)
          )
        : product.sizes && product.sizes.includes(sizes as string)
      : true;

    // Check colors filter (if colors are provided, check if the product has any of those colors)
    const colorMatch = colors
      ? Array.isArray(colors)
        ? colors.some(
            (color: string) => product.colors && product.colors.includes(color)
          )
        : product.colors && product.colors.includes(colors as string)
      : true;

    // Check min price
    const priceMinMatch = min ? product.price >= Number(min) : true;

    // Check max price
    const priceMaxMatch = max ? product.price <= Number(max) : true;

    // Return true if all conditions match
    return sizeMatch && colorMatch && priceMinMatch && priceMaxMatch;
  });

  const total = filteredProducts.length;
  const pricesArray = filteredProducts.map((product) => product.price);
  const minPrice = Math.min(...pricesArray);
  const maxPrice = Math.max(...pricesArray);

  // Sorting
  switch (sort) {
    case ProductsSortEnum.A_Z:
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case ProductsSortEnum.Z_A:
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case ProductsSortEnum.CHEAP_FIRST:
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case ProductsSortEnum.CHEAP_LAST:
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case ProductsSortEnum.LESS_RATED:
      filteredProducts.sort((a, b) => a.rating - b.rating);
      break;
    case ProductsSortEnum.MOST_RATED:
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
  }

  // Pagination
  if (page && perPage) {
    filteredProducts = filteredProducts.slice(
      (+page - 1) * +perPage,
      +page * +perPage
    );
  }

  const config = useRuntimeConfig(event);
  const { getSignedImageUrl } = useS3Client({
    keyId: config.awsKeyId,
    secretKey: config.awsSecretAccessKey,
    region: config.awsRegion,
    bucket: config.awsBucketName,
  });

  const productsList = await Promise.all(
    filteredProducts.map(async (product) => ({
      ...product,
      images: product.images
        ? await Promise.all(
            product.images.map(async (image) => await getSignedImageUrl(image))
          )
        : [],
    }))
  );

  return {
    products: productsList,
    total,
    minPrice,
    maxPrice,
    filters: {
      colors: [...filters.colors] as string[],
      sizes: [...filters.sizes] as string[],
    },
  };
});
