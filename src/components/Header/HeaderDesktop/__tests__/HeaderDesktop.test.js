import React from 'react'
import {renderHook} from '@testing-library/react-hooks'

import {act, render, screen, userEvent, waitFor} from 'shared/tests'
import HeaderDesktop from '..'
import {ThemeProvider, useTheme} from 'contexts'
import * as spyLocalizationContext from 'contexts/localizationContext'

// TODO remove all waits once react-spring 9.0.0 released

const navigationTranslation = {
  '/': 'Home',
  '/guides-topics': 'Guides & generic topics',
  '/colors-how-to': 'How to combine colors'
}

jest.spyOn(spyLocalizationContext, 'getLocaleTranslations').mockResolvedValue({
  navigation: navigationTranslation
})

test('renders headers and social media icons', () => {
  const {container} = render(<HeaderDesktop />)
  const header = screen.getByText(/your style/i)
  const subtitle = container.querySelector('p')
  const socialMedia = [/instagram/i, /facebook/i, /twitter/i, /vkontakte/i, /youtube/i]

  expect(header).toBeInTheDocument()
  expect(subtitle).toBeInTheDocument()
  socialMedia.forEach(icon => expect(screen.getByTitle(icon)).toBeInTheDocument())
})

test('menu (navigation) works as expected', async () => {
  render(<HeaderDesktop />)

  // root menu items check
  const expectedRootMenuItems = Object.values(navigationTranslation)
  expectedRootMenuItems.forEach(
    async item => expect(await screen.findByText(item)).toBeInTheDocument()
  )

  // submenu test
  const dropDown = screen.getByTestId('drop-down-navigation')

  expect(dropDown).not.toBeVisible()

  // TODO when react-spring 9.0 released, disable animations and test all cases
  // the cases are: 1) changing content when hovering on other root menu items,
  // 2) changing thumbnails when hover on both root and submenu items
})

test('theme switching works as expected', async () => {
  render(<HeaderDesktop />)
  const getThemeHook = () => renderHook(() => useTheme(), {
    wrapper: ThemeProvider
  })
  const themeSwitcher = screen.getByRole('checkbox')

  expect(getThemeHook().result.current.isDarkTheme).toBeFalsy()

  act(() => userEvent.click(themeSwitcher))
  await waitFor(() => expect(getThemeHook().result.current.isDarkTheme).toBeTruthy())

  userEvent.click(themeSwitcher)
  await waitFor(() => expect(getThemeHook().result.current.isDarkTheme).toBeFalsy())
})

test('language switcher works as expected', () => {
  const { getByLabelText, getByRole, queryByRole } = render(<HeaderDesktop />)
  const langSelectorBtn = getByLabelText(/switch language/i)

  expect(queryByRole('menu')).not.toBeInTheDocument()

  // open
  userEvent.click(langSelectorBtn)
  expect(getByRole('menu')).toBeInTheDocument()

  // close
  userEvent.click(langSelectorBtn)
  expect(queryByRole('menu')).not.toBeInTheDocument()

  // open
  userEvent.click(langSelectorBtn)
  expect(getByRole('menu')).toBeInTheDocument()

  // close by clicking outside
  act(() => userEvent.click(document.body))
  expect(queryByRole('menu')).not.toBeInTheDocument()
})

test.todo('clicking on a menu or submenu item should hide dropdown')