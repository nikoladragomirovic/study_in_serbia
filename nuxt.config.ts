export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["nuxt-calendly"],
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  runtimeConfig: {
    tallySigningSecret: "REDACTED",
    public: {
      tallyUrl:
        "https://tally.so/embed/wzJVja?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1",
      calendlyUrl:
        "https://calendly.com/liveinserbia/study-in-serbia-info-session",
    },
  },
});
