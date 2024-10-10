import products from "@/server/data/products.json";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  const config = useRuntimeConfig(event);
  const { getSignedImageUrl } = useS3Client({
    keyId: config.awsKeyId,
    secretKey: config.awsSecretAccessKey,
    region: config.awsRegion,
    bucket: config.awsBucketName,
  });

  const product = products.find((product) => product.slug === slug);
  if (!product) {
    // Throw an error
    return {};
  }

  return {
    ...product,
    images: await Promise.all(
      product.images.map(async (image) => await getSignedImageUrl(image))
    ),
  };
});
