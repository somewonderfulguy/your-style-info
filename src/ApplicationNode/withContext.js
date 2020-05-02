import React from 'react'

import {HeaderHeightProvider, ScreenDimensionsProvider, ThemeProvider} from 'contexts'

const withContext = WrappedComponent => {
  const Component = props => (
    <HeaderHeightProvider>
      <ThemeProvider>
        <ScreenDimensionsProvider>
          <WrappedComponent {...props} />
        </ScreenDimensionsProvider>
      </ThemeProvider>
    </HeaderHeightProvider>
  )
  Component.displayName = `WithContext(${WrappedComponent.displayName || WrappedComponent.name})`
  return Component
}

export default withContext