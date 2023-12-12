import React, { createContext, ReactNode, useContext } from 'react'

import { useResizeObserver } from 'shared/hooks'

export const ERROR_SCREEN =
  'useScreenDimensions must be used within a ScreenDimensionsProvider'

const ScreenHeightContext = createContext<number | undefined>(undefined)
ScreenHeightContext.displayName = 'ScreenHeightContext'

const ScreenWidthContext = createContext<number | undefined>(undefined)
ScreenWidthContext.displayName = 'ScreenWidthContext'

const IsDesktopContext = createContext<boolean | undefined>(undefined)
IsDesktopContext.displayName = 'IsDesktopContext'

export const DESKTOP_BOUNDARY = 1024

const ScreenDimensionsProvider = ({
  children
}: {
  children: ReactNode | ReactNode[]
}) => {
  const [bindResizeObserver, bounds] = useResizeObserver(undefined, {
    left: 0,
    top: 0,
    width: window.innerWidth,
    height: window.innerHeight
  })
  bindResizeObserver.current = document.body

  const { width: screenWidth, height: screenHeight } = bounds
  const isDesktop = screenWidth > DESKTOP_BOUNDARY

  return (
    <ScreenHeightContext.Provider value={screenHeight}>
      <ScreenWidthContext.Provider value={screenWidth}>
        <IsDesktopContext.Provider value={isDesktop}>
          {children}
        </IsDesktopContext.Provider>
      </ScreenWidthContext.Provider>
    </ScreenHeightContext.Provider>
  )
}

const useScreenHeight = () => {
  const context = useContext(ScreenHeightContext)
  if (context === undefined)
    throw new Error(
      'useScreenHeight must be used within a ScreenDimensionsProvider'
    )
  return context
}

const useScreenWidth = () => {
  const context = useContext(ScreenWidthContext)
  if (context === undefined)
    throw new Error(
      'useScreenWidth must be used within a ScreenDimensionsProvider'
    )
  return context
}

const useIsDesktop = () => {
  const context = useContext(IsDesktopContext)
  if (context === undefined)
    throw new Error(
      'useIsDesktop must be used within a ScreenDimensionsProvider'
    )
  return context
}

export {
  ScreenDimensionsProvider,
  useScreenHeight,
  useScreenWidth,
  useIsDesktop
}
