import React, {createContext, useCallback, useContext, useMemo, useEffect, useState} from 'react'

const ThemeContext = createContext()

const useTheme = () => {
  const context = useContext(ThemeContext)
  if(!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  const [isDarkTheme, setDarkTheme] = context

  const switchTheme = useCallback(
    () => setDarkTheme(!isDarkTheme),
    [isDarkTheme, setDarkTheme]
  )

  return {isDarkTheme, switchTheme}
}

const ThemeProvider = props => {
  const preferDarkQuery = '(prefers-color-scheme: dark)'
  const [isDarkTheme, setDarkTheme] = useState(
    () =>
      window.localStorage.getItem('isDarkTheme') === 'true' ||
      (window.matchMedia(preferDarkQuery).matches ? true : false),
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery)
    const handleChange = () => setDarkTheme(mediaQuery.matches ? true : false)
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('isDarkTheme', isDarkTheme)
  }, [isDarkTheme])

  const value = useMemo(() => [isDarkTheme, setDarkTheme], [isDarkTheme])

  return <ThemeContext.Provider value={value} {...props} />
}

export {ThemeProvider, useTheme}