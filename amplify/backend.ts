import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { storage } from "./storage/resource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 *
 * to bootstrap: npx aws-cdk@latest bootstrap aws://<your-aws-account-id>/<your-aws-region>
 *
 */
defineBackend({
  auth,
  data,
  storage,
});
