import React from 'react'

import {HeaderHeightProvider, LoadingProvider, ScreenDimensionsProvider, ThemeProvider} from 'contexts'

const withContext = WrappedComponent => {
  const Component = props => (
    <HeaderHeightProvider>
      <ThemeProvider>
        <LoadingProvider>
          <ScreenDimensionsProvider>
            <WrappedComponent {...props} />
          </ScreenDimensionsProvider>
        </LoadingProvider>
      </ThemeProvider>
    </HeaderHeightProvider>
  )
  Component.displayName = `WithContext(${WrappedComponent.displayName || WrappedComponent.name})`
  return Component
}

export default withContext