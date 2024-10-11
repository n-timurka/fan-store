import { defineFunction } from "@aws-amplify/backend";

export const orderCreatedFunction = defineFunction({
  name: "order",
  entry: "./handler.ts",
});
