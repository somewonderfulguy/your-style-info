import React from 'react'

import {
  HeaderHeightProvider,
  LocalizationProvider,
  ScreenDimensionsProvider,
  ThemeProvider
} from 'contexts'

const withContext = (WrappedComponent) => {
  const Component = (props) => (
    <HeaderHeightProvider>
      <LocalizationProvider>
        <ThemeProvider>
          <ScreenDimensionsProvider>
            <WrappedComponent {...props} />
          </ScreenDimensionsProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </HeaderHeightProvider>
  )
  Component.displayName = `WithContext(${
    WrappedComponent.displayName || WrappedComponent.name
  })`
  return Component
}

export default withContext
