import { useQuery, UseQueryOptions } from 'react-query'

import { request } from '.'

export type LocaleTranslationsType = {
  navigation: { [key: string]: string }
  subtitle: string
  switchLanguage: {
    switchLang: string
    switchLangTo: string
  }
}

const getLocaleTranslations = (locale: string) =>
  request<LocaleTranslationsType>(`locales/${locale}.json`)

export const useLocaleQuery = (
  locale: string,
  options: UseQueryOptions<LocaleTranslationsType> = {}
) =>
  //@ts-expect-error fix later
  useQuery(['locale', locale], () => getLocaleTranslations(locale), {
    enabled: !!locale,
    ...options
  })
