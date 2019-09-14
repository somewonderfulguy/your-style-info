import i18next from 'i18next'

i18next.init({
  whitelist: ['en', 'ru'],
  fallbackLng: ['en'],
  
  debug: process.env.NODE_ENV === 'development',
  interpolation: {escapeValue: false}
})

export default i18next