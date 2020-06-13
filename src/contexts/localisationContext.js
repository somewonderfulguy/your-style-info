import React, {createContext, useCallback, useContext, useEffect, useMemo, useReducer} from 'react'

import {LOCALES} from 'constants/index'

export const ERROR_LOCALISATION = 'useLocalisation must be used within a LocalisationProvider'

const status = {
  idle: 'idle',
  pending: 'pending',
  loaded: 'loaded',
  error: 'error'
}

const getLocaleTranslations = locale => fetch(`/locales/${locale}.json`)
  .then(res => res.json())
  .catch(e => {throw new Error(e)})

const getNavigatorLang = () => {
  try {
    return window.navigator.language.slice(0, 2)
  } catch (e) {
    console.error(e)
    return 'en'
  }
}

const LocalisationContext = createContext()

const useLocalisation = () => {
  const context = useContext(LocalisationContext)
  if(!context) {
    throw new Error(ERROR_LOCALISATION)
  }

  const [localeState, setLocaleState] = context

  const setLocale = useCallback(
    locale => {
      const isLocaleExists = !!LOCALES.find(el => el === locale)

      if(!isLocaleExists) {
        console.error(`Wrong locale ${locale}. Expected locales: ${LOCALES.join(', ')}. Set 'en' locale as fallback.`)
      }

      const newLocale = isLocaleExists ? locale : 'en'

      setLocaleState({status: status.pending})
      getLocaleTranslations(newLocale)
        .then(data => {
          setLocaleState({
            locale: newLocale,
            translations: data,
            status: status.loaded
          })
        })
        .catch(e => setLocaleState(
          setLocaleState({
            errorMessage: e,
            status: status.error
          })
        ))

      // TODO error handle error of broken language loading
    }, [setLocaleState]
  )

  return {
    locale: localeState.locale,
    translations: localeState.translations,
    status: localeState.status,
    errorMessage: localeState.errorMessage,
    setLocale
  }
}

const LocalisationProvider = props => {
  const [localeState, setLocaleState] = useReducer((s, a) => ({...s, ...a}), {
    locale: window.localStorage.getItem('locale') || getNavigatorLang(),
    translations: null,
    status: status.idle,
    errorMessage: null
  })

  useEffect(() => {
    localeState.locale && window.localStorage.setItem('locale', localeState.locale)
  }, [localeState.locale])

  const value = useMemo(() => ([localeState, setLocaleState]), [localeState])
  return <LocalisationContext.Provider value={value} {...props} />
}

export {LocalisationProvider, useLocalisation}