// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@storefront-ui/nuxt",
    '@nuxtjs/tailwindcss',
    "nuxt-graphql-client",
    "@nuxt/eslint",
    "maz-ui",
    "@ant-design-vue/nuxt",
  ],
})