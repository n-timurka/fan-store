// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/image",
    "@nuxt/fonts",
    "@unlok-co/nuxt-stripe",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxtjs/i18n",
  ],
  fonts: {
    provider: "google",
  },
  image: {
    domains: ["avatars0.githubusercontent.com"],
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
  },
});
