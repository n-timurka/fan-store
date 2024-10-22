import products from "@/server/data/products.json";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  const product = products.find((product) => product.slug === slug);
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found!",
    });
  }

  const config = useRuntimeConfig(event);
  const { accessKeyId, secretAccessKey, region, bucket } = config.aws;
  const { getSignedImageUrl } = useS3Client({
    accessKeyId,
    secretAccessKey,
    region,
    bucket,
  });

  return {
    ...product,
    images: await Promise.all(
      product.images.map(
        async (image) => await getSignedImageUrl(`big/${image}`)
      )
    ),
  };
});
