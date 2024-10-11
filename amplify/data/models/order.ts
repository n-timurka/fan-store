import { a } from "@aws-amplify/backend";

export const Order = a.model({
  id: a.id().required(),
  customer: a.customType({
    name: a.string().required(),
    phone: a.phone(),
    email: a.email().required(),
  }),
  status: a.enum(["NEW", "COMPLETED", "CANCELED"]),
  products: a.hasMany("OrderProduct", "orderId"),
});
