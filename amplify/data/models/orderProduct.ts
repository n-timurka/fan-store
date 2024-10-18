import { a } from "@aws-amplify/backend";

export const OrderProduct = a
  .model({
    id: a.id(),
    orderId: a.id().required(),
    order: a.belongsTo("Order", "orderId"),
    productSlug: a.string().required(),
    product: a.belongsTo("Product", "productSlug"),
    options: a.json(),
    quantity: a.integer().default(1),
  })
  .authorization((allow) => [allow.guest()]);
