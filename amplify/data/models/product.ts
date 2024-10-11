import { a } from "@aws-amplify/backend";

export const Product = a.model({
  id: a.id().required(),
  name: a.string().required(),
  slug: a.string().required(),
  description: a.string(),
  price: a.float().required(),
  category: a.string(),
  colors: a.string().array(),
  sizes: a.string().array(),
  rating: a.float(),
  images: a.string().array(),
});
