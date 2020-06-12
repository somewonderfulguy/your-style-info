import React, {createContext, useCallback, useContext, useEffect, useMemo, useReducer} from 'react'

export const ERROR_LOCALISATION = 'useLocalisation must be used within a LocalisationProvider'

const LocalisationContext = createContext()

const useLocalisation = () => {
  const context = useContext(LocalisationContext)
  if(!context) {
    throw new Error(ERROR_LOCALISATION)
  }

  const [locale, setLocale] = context
  const {currentLocale, translations} = locale

  const setCurrentLocale = useCallback(currentLocale => setLocale({currentLocale}), [setLocale])
  const setTranslations = useCallback(translations => setLocale({translations}), [setLocale])

  return {
    currentLocale,
    translations,
    setCurrentLocale,
    setTranslations
  }
}

const getNavigatorLang = () => {
  try {
    return window.navigator.language.slice(0, 2)
  } catch (e) {
    console.error(e)
    return 'en'
  }
}

const LocalisationProvider = props => {
  const [locale, setLocale] = useReducer((s, a) => ({...s, ...a}), {
    currentLocale: window.localStorage.getItem('currentLocale') || getNavigatorLang(),
    translations: null
  })

  useEffect(() => {
    locale.currentLocale && window.localStorage.setItem('currentLocale', locale.currentLocale)
  }, [locale.currentLocale])

  const value = useMemo(() => ([locale, setLocale]), [locale])
  return <LocalisationContext.Provider value={value} {...props} />
}

export {LocalisationProvider, useLocalisation}