import React, {createContext, useContext, useEffect, useState} from 'react'

const ScreenDimensionsContext = createContext()

function useScreenDimensions() {
  const context = useContext(ScreenDimensionsContext)
  if(!context) {
    throw new Error('useScreenDimensions must be used within a ScreenDimensionsProvider')
  }
  return context
}

const ScreenDimensionsProvider = props => {
  const [screenDimensions, setScreenDimensions] = useState({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight
  })

  useEffect(() => {
    const listener = () =>
      setScreenDimensions({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
      })

    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [])

  return <ScreenDimensionsContext.Provider value={screenDimensions} {...props} />
}

export {ScreenDimensionsProvider, useScreenDimensions}