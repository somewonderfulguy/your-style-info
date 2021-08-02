import React from 'react'
import {renderHook} from '@testing-library/react-hooks'

import {act, screen, render, waitFor, userEvent} from 'shared/tests'
import {ThemeProvider, useTheme} from 'contexts'
import {PRIME_ROUTES} from 'constants/index'
import FooterContent from '..'

test('renders and acts as expected', async () => {
  render(<FooterContent />)

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

  userEvent.click(themeSwitcher)
  expect(getThemeHook().result.current.isDarkTheme).toBeTruthy()

  userEvent.click(themeSwitcher)
  expect(getThemeHook().result.current.isDarkTheme).toBeFalsy()

  // switching language
  const langSelectorBtn = screen.getByLabelText(/switch language/i)
  await waitFor(() => expect(langSelectorBtn).not.toBeDisabled())

  // open lang switcher
  userEvent.click(langSelectorBtn)
  expect(screen.getByRole('menu')).toBeInTheDocument()

  // close lang switcher
  userEvent.click(langSelectorBtn)
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()

  // open lang switcher
  userEvent.click(langSelectorBtn)
  expect(screen.getByRole('menu')).toBeInTheDocument()

  // TODO check language switching

  // close lang switcher by clicking outside
  act(() => userEvent.click(document.body))
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()

  // social media
  const socialMedia = [/instagram/i, /facebook/i, /twitter/i, /vkontakte/i, /youtube/i]
  socialMedia.forEach(icon => expect(screen.getByTitle(icon)).toBeInTheDocument())
})