// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { th } from 'vuetify/locale'
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    locale: {
      locale: 'th',
      messages: { th },
    },
    theme: {
      defaultTheme: 'light',
    },
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
      },
  })

  nuxtApp.vueApp.use(vuetify)
})
