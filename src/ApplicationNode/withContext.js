import React from 'react'

import {
  HeaderHeightProvider, LoadingProvider, LocalizationProvider, ScreenDimensionsProvider, ThemeProvider
} from 'contexts'

const withContext = WrappedComponent => {
  const Component = props => (
    <HeaderHeightProvider>
      <LocalizationProvider>
        <ThemeProvider>
          <LoadingProvider>
            <ScreenDimensionsProvider>
              <WrappedComponent {...props} />
            </ScreenDimensionsProvider>
          </LoadingProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </HeaderHeightProvider>
  )
  Component.displayName = `WithContext(${WrappedComponent.displayName || WrappedComponent.name})`
  return Component
}

export default withContext