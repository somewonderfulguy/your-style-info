import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {act, fireEvent, render, wait, waitForElementToBeRemoved} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'
import user from '@testing-library/user-event'

import HeaderMobile from '..'
import {HeaderHeightProvider, ThemeProvider, useTheme} from 'contexts'
import {PRIME_ROUTES} from 'constants/index'

// TODO remove all waits once react-spring 9.0.0 released

const setup = () => render(<HeaderMobile />, {
  wrapper: props => (
    <MemoryRouter>
      <HeaderHeightProvider>
        <ThemeProvider {...props} />
      </HeaderHeightProvider>
    </MemoryRouter>
  )
})

test('header renders', () => {
  const {getByText} = setup()
  const header = getByText(/your style/i)
  expect(header).toBeInTheDocument()
})

test('menu (navigation) works as expected', async () => {
  const {getByRole, queryByRole, getByTitle, getByText} = setup()

  const navButton = getByTitle(/navigation/i)
  const getNav = () => getByRole('navigation')
  const queryNav = () => queryByRole('navigation')

  expect(queryNav()).toBeNull()

  // open navigation
  user.click(navButton)
  await wait(() => expect(getNav()).toBeInTheDocument())

  // navigation items and subitems
  const subLists = Array.from(getNav().querySelectorAll('.menuWrapper > ul ul')).map(ul => ul.parentElement)
  const treeButtons = getNav().querySelectorAll('button')

  const expectedExpandableItems = Object.values(PRIME_ROUTES).filter(val => val.sub)

  const expectedItems = []
  const findItems = (arr = Object.values(PRIME_ROUTES)) => arr.forEach(route => {
    route.name && expectedItems.push(route.name)
    route.sub && findItems(Object.values(route.sub))
  })
  findItems()

  const expectedDisabled = []
  const findDisabled = (arr = Object.values(PRIME_ROUTES)) => arr.forEach(route => {
    route.inactive && expectedDisabled.push(route.name)
    route.sub && findDisabled(Object.values(route.sub))
  })
  findDisabled()

  expectedItems.forEach(text => {
    expect(getByText(text)).toBeInTheDocument()
  })

  expectedDisabled.forEach(text => {
    expect(getByText(text)).toHaveAttribute('aria-disabled', 'true')
  })

  expect(treeButtons).toHaveLength(expectedExpandableItems.length)

  // social media icons
  const socialMedia = [/instagram/i, /facebook/i, /twitter/i, /vkontakte/i, /youtube/i]
  socialMedia.forEach(icon => expect(getByTitle(icon)).toBeInTheDocument())

  // open / close sub-items
  subLists.forEach(list => expect(list).not.toBeVisible())

  treeButtons.forEach(treeButton => user.click(treeButton))
  await wait(() => subLists.forEach(list => expect(list).toBeVisible()))

  treeButtons.forEach(treeButton => user.click(treeButton))
  await wait(() => subLists.forEach(list => expect(list).not.toBeVisible()))

  // close navigation
  user.click(navButton)
  waitForElementToBeRemoved(queryNav)
})

test('options work as expected', async () => {
  const {getByRole, queryByRole, getByTitle, getByLabelText} = setup()
  const optionsButton = getByTitle(/options/i)
  const getOptions = () => getByRole('menu')
  const queryOptions = () => queryByRole('menu')

  expect(queryOptions()).toBeNull()

  const openOptionsMenu = async () => {
    user.click(optionsButton)
    await wait(() => expect(getOptions()).toBeInTheDocument())
  }

  // open
  await openOptionsMenu()

  // close by clicking outside
  act(() => user.click(document.body))
  await wait(() => expect(queryOptions()).toBeNull())

  // open
  await openOptionsMenu()

  // close by scrolling down
  fireEvent.scroll(window, {target: {scrollY: 100}})
  await wait(() => expect(queryOptions()).toBeNull())

  // open
  await openOptionsMenu()

  // close by scrolling up
  fireEvent.scroll(window, {target: {scrollY: 0}})
  await wait(() => expect(queryOptions()).toBeNull())

  // open
  await openOptionsMenu()

  // switching dark/light theme
  const getThemeHook = () => renderHook(() => useTheme(), {
    wrapper: ThemeProvider
  })
  const themeSwitcher = getByLabelText(/switch theme/i)

  expect(getThemeHook().result.current.isDarkTheme).toBeFalsy()

  user.click(themeSwitcher)
  expect(getThemeHook().result.current.isDarkTheme).toBeTruthy()

  user.click(themeSwitcher)
  expect(getThemeHook().result.current.isDarkTheme).toBeFalsy()

  // TODO: language switching

  // close by clicking on the button
  user.click(optionsButton)
  await wait(() => expect(queryOptions()).toBeNull())
})