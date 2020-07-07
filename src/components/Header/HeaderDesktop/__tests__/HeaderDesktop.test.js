import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {act, render, screen} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'
import user from '@testing-library/user-event'

import HeaderDesktop from '..'
import {LocalisationProvider, ThemeProvider, useTheme} from 'contexts'
import * as spyLocalisationContext from 'contexts/localisationContext'

// TODO remove all waits once react-spring 9.0.0 released

const navigationTranslation = {
  '/': 'Home',
  '/guides-topics': 'Generic topics & guides',
  '/colors-how-to': 'How to combine colors'
}

jest.spyOn(spyLocalisationContext, 'getLocaleTranslations').mockResolvedValue({
  navigation: navigationTranslation
})

const setup = () => render(<HeaderDesktop />, {
  wrapper: props => (
    <MemoryRouter>
      <LocalisationProvider>
        <ThemeProvider {...props} />
      </LocalisationProvider>
    </MemoryRouter>
  )
})

test('renders headers and social media icons', () => {
  const {container} = setup()
  const header = screen.getByText(/your style/i)
  const subtitle = container.querySelector('p')
  const socialMedia = [/instagram/i, /facebook/i, /twitter/i, /vkontakte/i, /youtube/i]

  expect(header).toBeInTheDocument()
  expect(subtitle).toBeInTheDocument()
  socialMedia.forEach(icon => expect(screen.getByTitle(icon)).toBeInTheDocument())
})

test('menu (navigation) works as expected', async () => {
  setup()

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

test('theme switching works as expected', () => {
  const {getByRole} = setup()
  const getThemeHook = () => renderHook(() => useTheme(), {
    wrapper: ThemeProvider
  })
  const themeSwitcher = getByRole('checkbox')

  expect(getThemeHook().result.current.isDarkTheme).toBeFalsy()

  user.click(themeSwitcher)
  expect(getThemeHook().result.current.isDarkTheme).toBeTruthy()

  user.click(themeSwitcher)
  expect(getThemeHook().result.current.isDarkTheme).toBeFalsy()
})

test('language switcher works as expected', () => {
  const { getByLabelText, getByRole, queryByRole } = setup()
  const langSelectorBtn = getByLabelText(/switch language/i)

  expect(queryByRole('menu')).not.toBeInTheDocument()

  // open
  user.click(langSelectorBtn)
  expect(getByRole('menu')).toBeInTheDocument()

  // close
  user.click(langSelectorBtn)
  expect(queryByRole('menu')).not.toBeInTheDocument()

  // open
  user.click(langSelectorBtn)
  expect(getByRole('menu')).toBeInTheDocument()

  // close by clicking outside
  act(() => user.click(document.body))
  expect(queryByRole('menu')).not.toBeInTheDocument()
})

test.todo('clicking on a menu or submenu item should hide dropdown')