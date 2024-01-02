import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { request } from '../request'
import { LocaleTranslationsType } from './localeTypes'

const getLocaleTranslations = (locale: string) =>
  request<LocaleTranslationsType>(`locales/${locale}.json`)

export const useLocaleQuery = (
  locale: string,
  options: Omit<UseQueryOptions<LocaleTranslationsType>, 'queryKey'> = {}
) =>
  useQuery({
    queryFn: () => getLocaleTranslations(locale),
    queryKey: ['locale', locale],
    enabled: !!locale,
    ...options
  })
