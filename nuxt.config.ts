// https://nuxt.com/docs/api/configuration/nuxt-config
import {defineNuxtConfig} from "nuxt/config";

export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
      "@storefront-ui/nuxt",
      "@nuxt/eslint",
      "maz-ui",
      "@pinia/nuxt",
      "@pinia-plugin-persistedstate/nuxt",
      "@formkit/auto-animate/nuxt",
      '@nuxtjs/tailwindcss',
      "@ant-design-vue/nuxt",
      "@vueuse/nuxt"
    ],
    imports: {
        dirs: ['stores']
    },
    pinia: {
        storesDirs: ['./store/**']
    }
})