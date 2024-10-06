import products from "@/server/data/products.json";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type S3Config = {
  keyId: string;
  secretKey: string;
  region: string;
  bucket: string;
};
const useS3Client = (config: S3Config) => {
  const s3Client = new S3Client({
    credentials: {
      accessKeyId: config.keyId,
      secretAccessKey: config.secretKey,
    },
    region: config.region,
  });

  async function getSignedImageUrl(fileName: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: config.bucket,
      Key: fileName,
    });

    // Generate pre-signed URL for the image, valid for 1 hour (3600 seconds)
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  }

  return {
    getSignedImageUrl,
  };
};

export default defineEventHandler(async (event) => {
  const { category, sizes, colors } = getQuery(event);

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

  return Promise.all(
    filteredProducts.map(async (product) => ({
      ...product,
      images: await Promise.all(
        product.images.map(async (image) => await getSignedImageUrl(image))
      ),
    }))
  );
});
