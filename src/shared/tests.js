import React from 'react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {render} from '@testing-library/react'

export const renderWithRouter = (
  ui, options = {}, {
    route = '/',
    history = createMemoryHistory({initialEntries: [route]}),
  } = {}
) => ({
  ...render(
    ui, {
      ...options,
      wrapper: ({children}) => (
        options.wrapper
          ? <options.wrapper><Router history={history}>{children}</Router></options.wrapper>
          : <Router history={history}>{children}</Router>
      )
    }
  ),
  history
})