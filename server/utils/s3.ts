import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export type S3Config = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
};

export const useS3Client = (config: S3Config) => {
  const { accessKeyId, secretAccessKey, region, bucket: Bucket } = config;

  const s3Client = new S3Client({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region,
  });

  async function getSignedImageUrl(fileName: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket,
      Key: fileName,
    });

    // Generate pre-signed URL for the image, valid for 1 hour (3600 seconds)
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  }

  return {
    getSignedImageUrl,
  };
};
