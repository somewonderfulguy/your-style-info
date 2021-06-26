import React, {createContext, useContext, useEffect, useState} from 'react'

export const ERROR_SCREEN = 'useScreenDimensions must be used within a ScreenDimensionsProvider'

const ScreenDimensionsContext = createContext()
ScreenDimensionsContext.displayName = 'ScreenDimensionsContext'

export const DESKTOP_BOUNDARY = 1024

// TODO: replace with resizeObserver !!!! important
const ScreenDimensionsProvider = props => {
  const [screenDimensions, setScreenDimensions] = useState({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    isDesktop: window.innerWidth > 1024
  })

  useEffect(() => {
    const listener = () =>
      setScreenDimensions({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        isDesktop: window.innerWidth > 1024
      })

    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [])

  return <ScreenDimensionsContext.Provider value={screenDimensions} {...props} />
}

const useScreenDimensions = () => {
  const context = useContext(ScreenDimensionsContext)
  if(!context) {
    throw new Error(ERROR_SCREEN)
  }
  return context
}

export {ScreenDimensionsProvider, useScreenDimensions}