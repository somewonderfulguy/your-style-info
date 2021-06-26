import {useQuery} from 'react-query'

import {request} from '.'

const getLocaleTranslations = locale => request(`locales/${locale}.json`)

const useLocaleQuery = (locale, options) => {
  const data = useQuery(
    ['locale', locale],
    () => getLocaleTranslations(locale),
    {enabled: !!locale, ...options}
  )

  return data
}

export {useLocaleQuery}