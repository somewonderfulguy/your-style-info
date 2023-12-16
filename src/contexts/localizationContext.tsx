import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react'

import { LOCALES } from '~constants/index'
import { useLocaleQuery } from '~api/localeQueries'

type localeType = 'en' | 'ru'
type localeState = {
  locale: localeType
  upcomingLocale?: localeType | null
}
type localeAction = (s: localeState, a: Partial<localeState>) => localeState

type dispatchType = React.Dispatch<Partial<localeState>>

type contextType = [localeState, dispatchType]

const LocalizationContext = createContext<contextType | undefined>(undefined)
LocalizationContext.displayName = 'LocalizationContext'

const getNavigatorLang = (): localeType => {
  try {
    return window.navigator.language.slice(0, 2) as localeType
  } catch (e) {
    console.error(e)
    return 'en'
  }
}

const LocalizationProvider = ({
  children
}: {
  children: ReactNode | ReactNode[]
}) => {
  const [localeState, setLocaleState] = useReducer<localeAction>(
    (s, a) => ({ ...s, ...a }),
    {
      locale:
        (window.localStorage.getItem('locale') as localeType) ||
        getNavigatorLang(),
      upcomingLocale: null // upcoming locale is for animated transitions
    }
  )

  useEffect(() => {
    localeState.locale &&
      window.localStorage.setItem('locale', localeState.locale)
  }, [localeState.locale])

  const value = useMemo(
    () => [localeState, setLocaleState],
    [localeState]
  ) as contextType
  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  )
}

const useLocalization = () => {
  const context = useContext(LocalizationContext)
  if (context === undefined) {
    throw new Error(
      'useLocalization must be used within a LocalizationProvider'
    )
  }

  const [{ locale, upcomingLocale }, setLocaleState] = context

  // on init there's no upcomingLocale - using locale instead
  const theLocale = upcomingLocale || locale
  const queryData = useLocaleQuery(theLocale)

  useEffect(() => {
    setLocaleState({ locale: theLocale })
  }, [queryData.data, theLocale, setLocaleState])

  const setLocale = useCallback(
    (locale: localeType) => {
      const isLocaleExists = !!LOCALES.find((el) => el === locale)
      if (!isLocaleExists) {
        console.error(
          `Wrong locale ${locale}. Expected locales: ${LOCALES.join(
            ', '
          )}. Set 'en' locale as fallback.`
        )
      }
      setLocaleState({ upcomingLocale: isLocaleExists ? locale : 'en' })
    },
    [setLocaleState]
  )

  return useMemo(
    () =>
      [context[0], setLocale, queryData] as [
        localeState,
        typeof setLocale,
        typeof queryData
      ],
    [context, setLocale, queryData]
  )
}

export { LocalizationProvider, useLocalization }
