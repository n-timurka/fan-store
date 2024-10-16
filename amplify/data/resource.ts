import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { Order } from "./models/order";
import { Product } from "./models/product";

const schema = a.schema({
  Order: Order.authorization((allow) => [allow.guest()]),
  Product: Product.authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});
