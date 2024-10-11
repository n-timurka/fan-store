import { a } from "@aws-amplify/backend";

export const OrderProduct = a.model({
  id: a.id().required(),
  orderId: a.id().required(),
  productId: a.id().required(),
  product: a.belongsTo("Product", "productId"),
  quantity: a.integer().default(1),
  options: a.json(),
});
