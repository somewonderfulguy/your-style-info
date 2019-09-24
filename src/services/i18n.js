import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import {LANGUAGES} from '../constants'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['path', 'localstorage', 'navigator']
    },
    whitelist: [...LANGUAGES.keys()],
    fallbackLng: ['en'],
    debug: false,
    interpolation: {escapeValue: false}
  })

export default i18n