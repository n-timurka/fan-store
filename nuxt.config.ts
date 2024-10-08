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
    awsRegion: process.env.REGION,
    awsKeyId: process.env.ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.SECRET_ACCESS_KEY,
    awsBucketName: process.env.BUCKET_NAME,
  },
  modules: [
    "@nuxt/image",
    "@unlok-co/nuxt-stripe",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  googleFonts: {
    families: {
      Montserrat: true,
    },
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
