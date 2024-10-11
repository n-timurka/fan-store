import products from "@/server/data/products.json";
import { useS3Client } from "@/server/utils/s3";
// import type { Schema } from "~/amplify/data/resource";
// import { generateClient } from "aws-amplify/data";

export default defineEventHandler(async (event) => {
  const { category, sizes, colors } = getQuery(event);

  // const client = generateClient<Schema>();
  // const { data: items, errors } = await client.models.Product.list();

  const config = useRuntimeConfig(event);
  const { getSignedImageUrl } = useS3Client({
    keyId: config.awsKeyId,
    secretKey: config.awsSecretAccessKey,
    region: config.awsRegion,
    bucket: config.awsBucketName,
  });

  const filteredProducts = products.filter((product) => {
    // Check category filter
    const categoryMatch = category ? product.category === category : true;

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

    // Return true if all conditions match
    return categoryMatch && sizeMatch && colorMatch;
  });

  return Promise.all(
    filteredProducts.map(async (product) => ({
      ...product,
      images: await Promise.all(
        product.images.map(async (image) => await getSignedImageUrl(image))
      ),
    }))
  );
});
