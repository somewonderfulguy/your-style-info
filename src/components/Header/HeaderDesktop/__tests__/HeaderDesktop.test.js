import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {act, fireEvent, render, wait} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'
import user from '@testing-library/user-event'

import HeaderDesktop from '..'
import {LocalisationProvider, ThemeProvider, useTheme} from 'contexts'
import { PRIME_ROUTES } from 'constants/index'

// TODO remove all waits once react-spring 9.0.0 released

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
  const {getByText, getByTitle, container} = setup()
  const header = getByText(/your style/i)
  const subtitle = container.querySelector('p')
  const socialMedia = [/instagram/i, /facebook/i, /twitter/i, /vkontakte/i, /youtube/i]

  expect(header).toBeInTheDocument()
  expect(subtitle).toBeInTheDocument()
  socialMedia.forEach(icon => expect(getByTitle(icon)).toBeInTheDocument())
})

test('menu (navigation) works as expected', async () => {
  const {getByText, getByTestId} = setup()

  const primeRoutes = Object.values(PRIME_ROUTES)

  // root menu items check
  const expectedRootMenuItems = primeRoutes.map(o => o.name)
  const expectedRootDisabledItems = primeRoutes.filter(o => o.inactive).map(o => o.name)

  expectedRootMenuItems.forEach(item => expect(getByText(item)).toBeInTheDocument())
  expectedRootDisabledItems.forEach(disabledItem => (
    expect(getByText(disabledItem)).toHaveAttribute('aria-disabled', 'true')
  ))

  // TODO when react-spring 9.0 released, disable animations and test all cases
  // the cases are: 1) changing content when hovering on other root menu items,
  // 2) changing thumbnails when hover on both root and submenu items

  // submenu test
  const predefinedItemsWithSubmenu = primeRoutes.filter(o => o.sub)
  const dropDownTestId = 'drop-down-navigation'
  const dropDown = getByTestId(dropDownTestId)

  expect(dropDown).not.toBeVisible()

  for(let i = 0; i < predefinedItemsWithSubmenu.length; i ++) {
    const item = getByText(predefinedItemsWithSubmenu[i].name)

    fireEvent.mouseEnter(item)
    await wait(() => expect(dropDown).toBeVisible())

    fireEvent.mouseOut(item)
    await wait(() => expect(dropDown).not.toBeVisible())
  }

  // test closing submenu when hover out from submenu
  fireEvent.mouseEnter(getByText(predefinedItemsWithSubmenu[0].name))
  await wait(() => expect(dropDown).toBeVisible())
  fireEvent.mouseOut(dropDown)
  await wait(() => expect(dropDown).not.toBeVisible())
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