import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { Order } from "./models/order";
import { Product } from "./models/product";
import { Category } from "./models/category";
import { OrderProduct } from "./models/orderProduct";

const schema = a.schema({
  Product,
  Category,
  Order,
  OrderProduct,
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
  },
});
