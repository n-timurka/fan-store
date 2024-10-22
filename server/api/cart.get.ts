import products from "@/server/data/products.json";

export default defineEventHandler(async (event) => {
  const { ids } = getQuery(event);

  const filteredProducts = products.filter((product) =>
    (ids as number[]).includes(product.id)
  );

  const config = useRuntimeConfig(event);
  const { accessKeyId, secretAccessKey, region, bucket } = config.aws;
  const { getSignedImageUrl } = useS3Client({
    accessKeyId,
    secretAccessKey,
    region,
    bucket,
  });

  const productsList = await Promise.all(
    filteredProducts.map(async (product) => ({
      ...product,
      images: product.images
        ? await Promise.all(
            product.images.map(
              async (image) => await getSignedImageUrl(`small/${image}`)
            )
          )
        : [],
    }))
  );

  return productsList;
});
