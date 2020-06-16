import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {act, screen, render} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'
import user from '@testing-library/user-event'

import {LocalisationProvider, ThemeProvider, useTheme} from 'contexts'
import {PRIME_ROUTES} from 'constants/index'
import Footer from '..'

const setup = () => render(<Footer />, {
  wrapper: props => (
    <MemoryRouter>
      <LocalisationProvider>
        <ThemeProvider {...props} />
      </LocalisationProvider>
    </MemoryRouter>
  )
})

test('renders and acts as expected', () => {
  setup()

  // navigation
  const expectedNavLinks = Object.values(PRIME_ROUTES).map(obj => obj.name)

  const actualNavLinks = Array.from(
    screen.getByRole('navigation').querySelectorAll('li')
  ).map(li => li.textContent)

  expect(expectedNavLinks).toEqual(actualNavLinks)

  // theme switching
  const getThemeHook = () => renderHook(() => useTheme(), {
    wrapper: ThemeProvider
  })
  const themeSwitcher = screen.getByRole('checkbox')

  expect(getThemeHook().result.current.isDarkTheme).toBeFalsy()

  user.click(themeSwitcher)
  expect(getThemeHook().result.current.isDarkTheme).toBeTruthy()

  user.click(themeSwitcher)
  expect(getThemeHook().result.current.isDarkTheme).toBeFalsy()

  // switching language
  const langSelectorBtn = screen.getByLabelText(/switch language/i)

  expect(screen.queryByRole('menu')).not.toBeInTheDocument()

  // open lang switcher
  user.click(langSelectorBtn)
  expect(screen.getByRole('menu')).toBeInTheDocument()

  // close lang switcher
  user.click(langSelectorBtn)
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()

  // open lang switcher
  user.click(langSelectorBtn)
  expect(screen.getByRole('menu')).toBeInTheDocument()

  // TODO check language switching

  // close lang switcher by clicking outside
  act(() => user.click(document.body))
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()

  // social media
  const socialMedia = [/instagram/i, /facebook/i, /twitter/i, /vkontakte/i, /youtube/i]
  socialMedia.forEach(icon => expect(screen.getByTitle(icon)).toBeInTheDocument())
})