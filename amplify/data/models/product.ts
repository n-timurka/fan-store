import { a } from "@aws-amplify/backend";

export const Product = a
  .model({
    slug: a.string().required(),
    name: a.string().required(),
    description: a.string(),
    price: a.float().required(),
    categoryId: a.id().required(),
    category: a.belongsTo("Category", "categoryId"),
    colors: a.string().array(),
    sizes: a.string().array(),
    rating: a.float().required(),
    images: a.string().array(),
    orderProducts: a.hasMany("OrderProduct", "productSlug"),
  })
  .identifier(["slug"])
  .authorization((allow) => [
    allow.guest(),
    allow.authenticated().to(["read"]),
    allow.group("Admins").to(["create", "update", "delete"]),
  ]);
