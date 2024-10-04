export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  availableLocales: ["en", "es"],
  messages: {
    en: {
      products: "Products",
      card: "Card",
    },
    es: {
      products: "Productos",
      card: "Cuenta",
    },
  },
}));
