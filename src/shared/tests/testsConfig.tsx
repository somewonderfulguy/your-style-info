import React, {ReactElement} from 'react'
import {render as rtlRender} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {QueryClient, QueryClientProvider} from 'react-query'
import {setupServer} from 'msw/node'

import {HeaderHeightProvider, LocalizationProvider, ScreenDimensionsProvider, ThemeProvider} from 'contexts'
import ApplicationNode, {defaultOptions} from 'ApplicationNode'
import {localeHandlers, pageHandlers} from './apiHandlers'

const queryClient = new QueryClient({
  defaultOptions: {
    ...defaultOptions,
    queries: {
      ...defaultOptions.queries,
      retry: false
    }
  }
})

const server = setupServer(
  ...localeHandlers,
  ...pageHandlers
)
server.listen({onUnhandledRequest: 'error'})

const render = (ui: ReactElement, {route = '/', ...options} = {}) => {
  const history = createMemoryHistory({initialEntries: [route]})
  const Wrapper = (props = {}) => (
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
    history
  }
}

const renderWholeApp = ({route = '/', ...options} = {}) => {
  const history = createMemoryHistory({initialEntries: [route]})
  return {
    ...rtlRender(
      <ApplicationNode qClient={queryClient} history={history} />,
      options
    ),
    history
  }
}

const renderWithoutProviders = rtlRender

export * from '@testing-library/react'
export {render, renderWholeApp, renderWithoutProviders, server, userEvent}