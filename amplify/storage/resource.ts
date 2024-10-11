import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "fanStoreDrive",
  access: (allow) => ({
    "products/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read", "write"]),
    ],
  }),
});
