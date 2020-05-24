import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {fireEvent, render} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'
import user from '@testing-library/user-event'

import HeaderDesktop from '..'
import {ThemeProvider, useTheme} from 'contexts'
import { PRIME_ROUTES } from 'constants/index'

// TODO remove all waits once react-spring 9.0.0 released

const setup = () => render(<HeaderDesktop />, {
  wrapper: props => (
    <MemoryRouter>
      <ThemeProvider {...props} />
    </MemoryRouter>
  )
})

test('renders headers and social media icons', () => {
  const {getByText, getByTitle, container} = setup()
  const header = getByText(/your style/i)
  const subtitle = container.querySelector('p')
  const socialMedia = [/instagram/i, /facebook/i, /twitter/i, /vkontakte/i, /youtube/i]

  // TODO fix 18next
  expect(header).toBeInTheDocument()
  expect(subtitle).toMatchSnapshot()
  socialMedia.forEach(icon => expect(getByTitle(icon)).toBeInTheDocument())
})

test('menu (navigation) works as expected', () => {
  const {getByText} = setup()
  // getByRole, getAllByRole,
  // const navigation = getByRole('navigation')
  // const rootMenu = getAllByRole('list')[0]
  // const getSubMenu = () => getAllByRole('list')[1]

  // root menu items check
  const expectedRootMenuItems = Object.values(PRIME_ROUTES).map(o => o.name)
  const expectedRootDisabledItems = Object.values(PRIME_ROUTES).filter(o => o.inactive).map(o => o.name)

  expectedRootMenuItems.forEach(item => expect(getByText(item)).toBeInTheDocument())
  expectedRootDisabledItems.forEach(disabledItem => (
    expect(getByText(disabledItem)).toHaveAttribute('aria-disabled', 'true')
  ))

  // mouse enter
  // mouse out
  // mouse out but enter submenu

  // loop all sub items
  // in each submenu check - 1) list items, 2) disabled items, 3) img

  expect(null).toBeNull()
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

  expect(queryByRole('menu')).toBeNull()

  // open
  user.click(langSelectorBtn)
  expect(getByRole('menu')).toBeInTheDocument()

  // close
  user.click(langSelectorBtn)
  expect(queryByRole('menu')).toBeNull()

  // open
  user.click(langSelectorBtn)
  expect(getByRole('menu')).toBeInTheDocument()

  // TODO check language switching

  // close by clicking outside
  fireEvent.click(document)
  expect(queryByRole('menu')).toBeNull()
})