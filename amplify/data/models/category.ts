import { a } from "@aws-amplify/backend";

export const Category = a
  .model({
    slug: a.string().required(),
    name: a.string().required(),
    description: a.string(),
    image: a.string(),
    products: a.hasMany("Product", "categoryId"),
  })
  .identifier(["slug"])
  .authorization((allow) => [
    allow.guest().to(["read"]),
    allow.authenticated().to(["read"]),
    allow.group("Admins").to(["create", "update", "delete"]),
  ]);
