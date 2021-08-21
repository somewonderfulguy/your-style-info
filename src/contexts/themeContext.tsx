import React, {
  createContext, Dispatch, ReactNode, SetStateAction,
  useCallback, useContext, useEffect, useState
} from 'react'

type dispatchType = Dispatch<SetStateAction<boolean>>

const ThemeStateContext = createContext<boolean | undefined>(undefined)
ThemeStateContext.displayName = 'ThemeStateContext'

const ThemeDispatchContext = createContext<dispatchType | undefined>(undefined)
ThemeDispatchContext.displayName = 'ThemeDispatchContext'

const ThemeProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const preferDarkQuery = '(prefers-color-scheme: dark)'
  const [isDarkTheme, setDarkTheme] = useState(
    () =>
      window.localStorage.getItem('isDarkTheme') === 'true' ||
      (window.matchMedia(preferDarkQuery).matches ? true : false)
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery)
    const handleChange = () => setDarkTheme(mediaQuery.matches ? true : false)
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('isDarkTheme', String(isDarkTheme))
  }, [isDarkTheme])

  return (
    <ThemeStateContext.Provider value={isDarkTheme}>
      <ThemeDispatchContext.Provider value={setDarkTheme}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  )
}

const useThemeState = () => {
  const isDarkTheme = useContext(ThemeStateContext)

  if(isDarkTheme === undefined) {
    throw new Error('useThemeState must be used within a ThemeProvider')
  }

  return isDarkTheme
}

const useThemeSwitch = () => {
  const setDarkTheme = useContext(ThemeDispatchContext)

  if(setDarkTheme === undefined) {
    throw new Error('useThemeSwitch must be used within a ThemeProvider')
  }

  const switchTheme = useCallback(
    () => setDarkTheme(prevTheme => !prevTheme),
    [setDarkTheme]
  )

  return switchTheme
}

export {ThemeProvider, useThemeState, useThemeSwitch}