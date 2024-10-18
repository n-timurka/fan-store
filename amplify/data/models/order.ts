import { a } from "@aws-amplify/backend";

export const Order = a
  .model({
    id: a.id(),
    sessionId: a.string().required(),
    status: a.enum(["new", "completed", "canceled"]),
    customerData: a.customType({
      name: a.string().required(),
      email: a.email().required(),
      phone: a.phone(),
    }),
    address: a.customType({
      country: a.string().required(),
      city: a.string().required(),
      street: a.string().required(),
      building: a.string().required(),
      appartment: a.string(),
      zip: a.string().required(),
    }),
    products: a.hasMany("OrderProduct", "orderId"),
  })
  .authorization((allow) => [allow.guest()]);
