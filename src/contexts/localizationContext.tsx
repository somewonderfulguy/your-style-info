import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react'

import { LOCALES } from '~constants/index'
import { useLocaleQuery } from '~api/localeQueries'

type LocaleType = 'en' | 'ua'
type LocaleState = {
  locale: LocaleType
  upcomingLocale?: LocaleType | null
}
type LocaleAction = (s: LocaleState, a: Partial<LocaleState>) => LocaleState

type DispatchType = Dispatch<Partial<LocaleState>>

type ContextType = [LocaleState, DispatchType]

const LocalizationContext = createContext<ContextType | undefined>(undefined)
LocalizationContext.displayName = 'LocalizationContext'

const getNavigatorLang = (): LocaleType => {
  try {
    return window.navigator.language.slice(0, 2) as LocaleType
  } catch (e) {
    console.error(e)
    return 'en'
  }
}

const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const [LocaleState, setLocaleState] = useReducer<LocaleAction>(
    (s, a) => ({ ...s, ...a }),
    {
      locale:
        (window.localStorage.getItem('locale') as LocaleType) ||
        getNavigatorLang(),
      upcomingLocale: null // upcoming locale is for animated transitions
    }
  )

  useEffect(() => {
    LocaleState.locale &&
      window.localStorage.setItem('locale', LocaleState.locale)
  }, [LocaleState.locale])

  const value = useMemo(
    () => [LocaleState, setLocaleState],
    [LocaleState]
  ) as ContextType
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
    (locale: LocaleType) => {
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
        LocaleState,
        typeof setLocale,
        typeof queryData
      ],
    [context, setLocale, queryData]
  )
}

export { LocalizationProvider, useLocalization }
