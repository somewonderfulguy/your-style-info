import React from 'react'
import {render as rtlRender} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {QueryClient, QueryClientProvider} from 'react-query'

import {HeaderHeightProvider, LocalizationProvider, ScreenDimensionsProvider, ThemeProvider} from 'contexts'

const queryClient = new QueryClient({
  defaultOptions: {
    initialStale: true
  }
})

const render = (ui, {route = '/', ...options} = {}) => {
  const history = createMemoryHistory({initialEntries: [route]})
  const Wrapper = props => (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <HeaderHeightProvider>
          <LocalizationProvider>
            <ThemeProvider>
              <ScreenDimensionsProvider {...props} />
            </ThemeProvider>
          </LocalizationProvider>
        </HeaderHeightProvider>
      </Router>
    </QueryClientProvider>
  )
  return {
    ...rtlRender(ui, {wrapper: Wrapper, ...options}),
    history,
  }
}

const renderWithoutProviders = rtlRender

export * from '@testing-library/react'
export {render, renderWithoutProviders, userEvent}