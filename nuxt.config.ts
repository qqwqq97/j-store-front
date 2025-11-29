// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    VITE_STRIPE_SECRET_KEY: import.meta.env.VITE_STRIPE_SECRET_KEY,
    public: {
      apiBase: 'http://localhost:8000',
      VITE_STRIPE_PUBLIC_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY
    }
  },
  plugins: [
    '~/plugins/pinia.js'
  ]
})