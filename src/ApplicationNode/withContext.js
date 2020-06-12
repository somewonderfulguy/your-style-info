import React from 'react'

import {
  HeaderHeightProvider, LoadingProvider, LocalisationProvider, ScreenDimensionsProvider, ThemeProvider
} from 'contexts'

const withContext = WrappedComponent => {
  const Component = props => (
    <HeaderHeightProvider>
      <LocalisationProvider>
        <ThemeProvider>
          <LoadingProvider>
            <ScreenDimensionsProvider>
              <WrappedComponent {...props} />
            </ScreenDimensionsProvider>
          </LoadingProvider>
        </ThemeProvider>
      </LocalisationProvider>
    </HeaderHeightProvider>
  )
  Component.displayName = `WithContext(${WrappedComponent.displayName || WrappedComponent.name})`
  return Component
}

export default withContext