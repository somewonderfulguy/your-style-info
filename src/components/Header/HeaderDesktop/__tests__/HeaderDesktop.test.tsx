import React from 'react'
import { renderHook } from '@testing-library/react-hooks'

import {
  act,
  render,
  renderWholeApp,
  screen,
  userEvent,
  waitFor
} from 'shared/tests'
import HeaderDesktop from '..'
import { ThemeProvider, useThemeState } from 'contexts'

// TODO remove all waits once react-spring 9.0.0 released

const navigationTranslation = {
  '/': 'Home',
  '/guides-topics': 'Guides & generic topics',
  '/colors-how-to': 'How to combine colors'
}

test('renders headers and social media icons', () => {
  const { container } = render(<HeaderDesktop />)
  const header = screen.getByText(/your style/i)
  const subtitle = container.querySelector('p')
  const socialMedia = [/instagram/i, /facebook/i, /twitter/i, /youtube/i]

  expect(header).toBeInTheDocument()
  expect(subtitle).toBeInTheDocument()
  socialMedia.forEach((icon) =>
    expect(screen.getByTitle(icon)).toBeInTheDocument()
  )
})

test('menu (navigation) works as expected', async () => {
  render(<HeaderDesktop />)

  // root menu items check
  const expectedRootMenuItems = Object.values(navigationTranslation)
  expectedRootMenuItems.forEach(async (item) =>
    expect(await screen.findByText(item)).toBeInTheDocument()
  )

  // submenu test
  const dropDown = screen.getByTestId('drop-down-navigation')

  expect(dropDown).not.toBeVisible()

  // TODO 1) changing content when hovering on other root menu items,
  // TODO 2) changing thumbnails when hover on both root and submenu items
})

test('theme switching works as expected', async () => {
  render(<HeaderDesktop />)
  const getThemeHook = () =>
    renderHook(() => useThemeState(), {
      wrapper: ThemeProvider
    })
  const themeSwitcher = screen.getByRole('checkbox')

  expect(getThemeHook().result.current).toBeFalsy()

  act(() => userEvent.click(themeSwitcher))
  await waitFor(() => expect(getThemeHook().result.current).toBeTruthy())

  userEvent.click(themeSwitcher)
  await waitFor(() => expect(getThemeHook().result.current).toBeFalsy())
})

test('language switcher works as expected', async () => {
  renderWholeApp()
  const [langSelectorBtn] = screen.getAllByLabelText(/switch language/i)

  expect(screen.queryByRole('menu')).not.toBeInTheDocument()

  // open
  await waitFor(() => expect(langSelectorBtn).not.toBeDisabled())
  userEvent.click(langSelectorBtn)
  expect(screen.getByRole('menu')).toBeInTheDocument()

  // close
  userEvent.click(langSelectorBtn)
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()

  // open
  userEvent.click(langSelectorBtn)
  expect(screen.getByRole('menu')).toBeInTheDocument()

  // close by clicking outside
  act(() => userEvent.click(document.body))
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()
})

test.todo('clicking on a menu or submenu item should hide dropdown')
