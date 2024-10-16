import { a } from "@aws-amplify/backend";

export const Product = a.model({
  id: a.id(),
  name: a.string().required(),
});
