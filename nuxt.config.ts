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
    awsRegion: process.env.AWS_REGION,
    awsKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsBucketName: process.env.AWS_BUCKET_NAME,
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
});
