import React from 'react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import {render} from '@testing-library/react'

export const renderWithRouter = (
  ui, {
    route = '/',
    history = createMemoryHistory({initialEntries: [route]}),
  } = {}
) => ({
  ...render(
    ui, {
      wrapper: ({children}) => (
        <Router history={history}>{children}</Router>
      )
    }
  ),
  history
})