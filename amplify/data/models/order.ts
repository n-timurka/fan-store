import { a } from "@aws-amplify/backend";

export const Order = a.model({
  id: a.id(),
  status: a.enum(["new", "completed", "canceled"]),
});
