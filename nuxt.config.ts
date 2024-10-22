// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    baseUrl: process.env.BASE_URL,
    aws: {
      region: process.env.REGION,
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      bucket: process.env.BUCKET_NAME,
    },
  },
  modules: [
    "@nuxt/image",
    "@unlok-co/nuxt-stripe",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxt/fonts",
  ],
  image: {
    provider: "awsAmplify",
    domains: [process.env.IMAGE_BASE_URL || ""],
  },
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  stripe: {
    server: {
      key: process.env.STRIPE_SERVER_KEY,
      options: {},
    },
    client: {
      key: process.env.STRIPE_CLIENT_KEY,
      options: {},
    },
  },
});
