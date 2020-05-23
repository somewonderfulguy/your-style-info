import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {render} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'
import user from '@testing-library/user-event'

import {ThemeProvider, useTheme} from 'contexts'
import {PRIME_ROUTES} from 'constants/index'
import Footer from '..'

const setup = () => render(<Footer />, {
  wrapper: props => (
    <MemoryRouter>
      <ThemeProvider {...props} />
    </MemoryRouter>
  )
})

test('renders and acts as expected', () => {
  const {getByRole} = setup()

  // navigation
  const expectedNavLinks = Object.values(PRIME_ROUTES).map(obj => obj.name)

  const actualNavLinks = Array.from(
    getByRole('navigation').querySelectorAll('li')
  ).map(li => li.textContent)

  expect(expectedNavLinks).toEqual(actualNavLinks)

  // theme switching
  const getThemeHook = () => renderHook(() => useTheme(), {
    wrapper: ThemeProvider
  })
  const themeSwitcher = getByRole('checkbox')

  expect(getThemeHook().result.current.isDarkTheme).toBeFalsy()

  user.click(themeSwitcher)
  expect(getThemeHook().result.current.isDarkTheme).toBeTruthy()

  user.click(themeSwitcher)
  expect(getThemeHook().result.current.isDarkTheme).toBeFalsy()

  // TODO: switching language
})