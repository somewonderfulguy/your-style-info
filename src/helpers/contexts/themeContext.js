import React, {createContext, useContext, useMemo, useEffect, useState} from 'react'

const ThemeContext = createContext()

const useTheme = () => {
  const context = useContext(ThemeContext)
  if(!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  const [isDarkTheme, setDarkTheme] = context

  const switchTheme = () => {
    setDarkTheme(!isDarkTheme)
    localStorage.setItem('isDarkTheme', !isDarkTheme)
  }

  return {isDarkTheme, switchTheme}
}

const ThemeProvider = props => {
  const [isDarkTheme, setDarkTheme] = useState(false)
  const [hasThemeLoaded, setThemeLoaded] = useState(false)

  useEffect(() => {
    const isLocalStorageDark = localStorage.getItem('isDarkTheme')
    setDarkTheme(isLocalStorageDark === 'true')
    setThemeLoaded(true)
  }, [])

  const value = useMemo(() => [isDarkTheme, setDarkTheme], [isDarkTheme])

  if(!hasThemeLoaded) {
    // avoiding render default light theme and then re-render to
    // dark theme if localStorage keeps dark mode as true
    return <div />
  }

  return <ThemeContext.Provider value={value} {...props} />
}

export {ThemeProvider, useTheme}