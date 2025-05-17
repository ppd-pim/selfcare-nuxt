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
    // ✅ ตัวแปรลับ (ใช้ได้เฉพาะฝั่ง server เท่านั้น)
    otpApiKey: process.env.OTP_API_KEY,
    otpSecretKey: process.env.OTP_SECRET_KEY,
    otpProjectKey: process.env.OTP_PROJECT_KEY,
    usernameLine: process.env.USERNAMELINE,
    passwordLine: process.env.PASSWORDLINE,

    // ✅ ตัวแปร public สำหรับ client ใช้งาน เช่น base URL
    public: {
      publicApiUrl: process.env.PUBLIC_API_URL
    }
  },
  vite: {
    server: {
      allowedHosts: [
        '4406-202-12-97-153.ngrok-free.app' // ใส่ host ของ ngrok ที่คุณได้มา
      ]
    }
  }
})
