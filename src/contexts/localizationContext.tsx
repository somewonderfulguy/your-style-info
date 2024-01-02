import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef
} from 'react'
import { useLocation, useNavigate, useMatch } from 'react-router-dom'

import { LOCALES } from '~constants/index'
import { useLocaleQuery } from '~api/localeApi'

export type LocaleType = 'en' | 'ua'
type LocaleState = {
  locale: LocaleType
  upcomingLocale?: LocaleType | null
}
type LocaleAction = (s: LocaleState, a: Partial<LocaleState>) => LocaleState

type DispatchType = Dispatch<Partial<LocaleState>>

type ContextType = [LocaleState, DispatchType]

const LocalizationContext = createContext<ContextType | undefined>(undefined)
LocalizationContext.displayName = 'LocalizationContext'

// TODO investigate, if Navigator lang is not en/ua
const getNavigatorLang = (): LocaleType => {
  try {
    return window.navigator.language.slice(0, 2) as LocaleType
  } catch (e) {
    console.error(e)
    return 'en'
  }
}

const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const match = useMatch('/:locale/*')

  const localStateChange = useRef(false)
  const [LocaleState, setLocaleState] = useReducer<LocaleAction>(
    (state, newState) => {
      const { upcomingLocale } = newState
      if (upcomingLocale) {
        window.localStorage.setItem('locale', upcomingLocale)
      }
      return { ...state, ...newState }
    },
    {
      locale:
        (window.localStorage.getItem('locale') as LocaleType) ||
        getNavigatorLang(),
      upcomingLocale: null // upcoming locale is for animated transitions
    }
  )

  const urlLocale = match?.params.locale as LocaleType

  // necessary useEffect to handle external url change such as back/forward browser buttons or direct url change
  useEffect(() => {
    if (localStateChange.current) {
      localStateChange.current = false
      return
    }

    if (urlLocale && urlLocale !== LocaleState.locale) {
      // it seems weird, to set state twice, but it's necessary for animation
      setLocaleState({ upcomingLocale: urlLocale })
      setTimeout(() => setLocaleState({ locale: urlLocale }))
    }
  }, [LocaleState.locale, urlLocale])

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

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [{ locale, upcomingLocale }, setLocaleState] = context

  // on init there's no `upcomingLocale` - using `locale` instead
  const theLocale = upcomingLocale || locale
  const queryData = useLocaleQuery(theLocale)

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

      const urlLocale = pathname.substring(0, 3).replaceAll('/', '')

      if (urlLocale !== locale) {
        navigate(pathname.replace(/^\/\w{2}/, `/${locale}`))
        const newLocale = isLocaleExists ? locale : 'en'

        // it seems weird, to set state twice, but it's necessary for animation
        setLocaleState({ upcomingLocale: newLocale })
        setTimeout(() => setLocaleState({ locale: newLocale }))
      }
    },
    [setLocaleState, pathname, navigate]
  )

  return useMemo(
    () =>
      [context[0], setLocale, queryData] as [
        (typeof context)[0],
        typeof setLocale,
        typeof queryData
      ],
    [context, setLocale, queryData]
  )
}

export { LocalizationProvider, useLocalization }
