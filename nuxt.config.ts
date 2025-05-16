// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/styles/main.scss',
    '~/assets/styles/animate.min.css',
    '~/assets/styles/bootstrap.min.css',
    '~/assets/styles/default.css',
    '~/assets/styles/fontawesome.min.css',
    '~/assets/styles/magnific-popup.css',
    '~/assets/styles/main.css',
    '~/assets/styles/owl.carousel.min.css',
    '~/assets/styles/responsive.css',
    '~/assets/styles/slick.css',
  ],
  build: {
    transpile: ['vuetify'],
  },

  // ✅ เพิ่มตรงนี้
  runtimeConfig: {
    public: {
      OTP_API_KEY: process.env.NUXT_PUBLIC_OTP_API_KEY,
      OTP_SECRET_KEY: process.env.NUXT_PUBLIC_OTP_SECRET_KEY,
      OTP_PROJECT_KEY: process.env.NUXT_PUBLIC_OTP_PROJECT_KEY,
      USERNAMELINE: process.env.NUXT_PUBLIC_USERNAMELINE,
      PASSWORDLINE: process.env.NUXT_PUBLIC_PASSWORDLINE,
      PUBLIC_API_URL: process.env.NUXT_PUBLIC_PUBLIC_API_URL,
    }
  },
  vite: {
    server: {
      allowedHosts: [
        '4757-202-28-119-61.ngrok-free.app' // ใส่ host ของ ngrok ที่คุณได้มา
      ]
    }
  }
})
