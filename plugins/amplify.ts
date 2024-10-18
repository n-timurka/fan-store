import { Amplify } from "aws-amplify";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  Amplify.configure({
    auth: {
      aws_region: config.awsRegion,
      user_pool_id: config.cognitoUserPoolId,
      user_pool_client_id: config.cognitoUserPoolClientId,
      identity_pool_id: config.cognitoIdentityPoolId,
    },
    data: {
      url: config.dynamoDbDataUrl,
      aws_region: config.awsRegion,
      default_authorization_type: "AWS_IAM",
      authorization_types: ["AMAZON_COGNITO_USER_POOLS"],
    },
    storage: {
      aws_region: config.awsRegion,
      bucket_name: config.s3StorageBucketName,
    },
  });
});
