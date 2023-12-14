import { HeaderHeightProvider } from '~contexts/headerHeightContext'
import { ScreenDimensionsProvider } from '~contexts/screenDimensionsContext'
import { ThemeProvider } from '~contexts/themeContext'
import { LocalizationProvider } from '~contexts/localizationContext'

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
