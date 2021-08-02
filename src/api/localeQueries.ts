import {useQuery, UseQueryOptions} from 'react-query'

import {request} from '.'

export type localeTranslationsType = {
  navigation: {[key: string]: string}
  subtitle: string
  switchLanguage: {
    switchLang: string
    switchLangTo: string
  }
}

const getLocaleTranslations = (locale: string) => request<localeTranslationsType>(`locales/${locale}.json`)

export const useLocaleQuery = (locale: string, options: UseQueryOptions<localeTranslationsType>) => (
  useQuery(
    ['locale', locale],
    () => getLocaleTranslations(locale),
    {enabled: !!locale, ...options}
  )
)