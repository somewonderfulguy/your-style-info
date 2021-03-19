import React from 'react'
import {render as rtlRender} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'

import {HeaderHeightProvider, LocalisationProvider, ScreenDimensionsProvider, ThemeProvider} from 'contexts'

const render = (ui, {route = '/', ...options} = {}) => {
  const history = createMemoryHistory({initialEntries: [route]})
  const Wrapper = props => (
    <Router history={history}>
      <HeaderHeightProvider>
        <LocalisationProvider>
          <ThemeProvider>
            <ScreenDimensionsProvider {...props} />
          </ThemeProvider>
        </LocalisationProvider>
      </HeaderHeightProvider>
    </Router>
  )
  return {
    ...rtlRender(ui, {wrapper: Wrapper, ...options}),
    history,
  }
}

const renderWithoutProviders = rtlRender

export * from '@testing-library/react'
export {render, renderWithoutProviders, userEvent}