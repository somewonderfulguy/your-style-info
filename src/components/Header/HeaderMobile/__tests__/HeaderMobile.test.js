import React from 'react'
import {renderHook} from '@testing-library/react-hooks'

import {act, fireEvent, render, userEvent, waitFor, waitForElementToBeRemoved} from 'shared/tests'
import HeaderMobile from '..'
import {ThemeProvider, useTheme} from 'contexts'
import {PRIME_ROUTES} from 'constants/index'

// TODO remove all waits once react-spring 9.0.0 released

test('header renders', () => {
  const {getByText} = render(<HeaderMobile />)
  const header = getByText(/your style/i)
  expect(header).toBeInTheDocument()
})

test('menu (navigation) works as expected', async () => {
  const {getByRole, queryByRole, getByTitle, getByText} = render(<HeaderMobile />)

  const navButton = getByTitle(/navigation/i)
  const getNav = () => getByRole('navigation')
  const queryNav = () => queryByRole('navigation')

  expect(queryNav()).not.toBeInTheDocument()

  // open navigation
  userEvent.click(navButton)
  await waitFor(() => expect(getNav()).toBeInTheDocument())

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

  treeButtons.forEach(treeButton => userEvent.click(treeButton))
  await waitFor(() => subLists.forEach(list => expect(list).toBeVisible()))

  treeButtons.forEach(treeButton => userEvent.click(treeButton))
  await waitFor(() => subLists.forEach(list => expect(list).not.toBeVisible()))

  // close navigation
  userEvent.click(navButton)
  await waitForElementToBeRemoved(queryNav)
})

test('options work as expected', async () => {
  const {getByRole, queryByRole, getByTitle, getByLabelText} = render(<HeaderMobile />)
  const optionsButton = getByTitle(/options/i)
  const getOptions = () => getByRole('menu')
  const queryOptions = () => queryByRole('menu')

  expect(queryOptions()).not.toBeInTheDocument()

  const openOptionsMenu = async () => {
    userEvent.click(optionsButton)
    await waitFor(() => expect(getOptions()).toBeInTheDocument())
  }

  // open
  await openOptionsMenu()

  // close by clicking outside
  act(() => userEvent.click(document.body))
  await waitFor(() => expect(queryOptions()).not.toBeInTheDocument())

  // open
  await openOptionsMenu()

  // close by scrolling down
  fireEvent.scroll(window, {target: {scrollY: 100}})
  await waitFor(() => expect(queryOptions()).not.toBeInTheDocument())

  // open
  await openOptionsMenu()

  // close by scrolling up
  fireEvent.scroll(window, {target: {scrollY: 0}})
  await waitFor(() => expect(queryOptions()).not.toBeInTheDocument())

  // open
  await openOptionsMenu()

  // switching dark/light theme
  const getThemeHook = () => renderHook(() => useTheme(), {
    wrapper: ThemeProvider
  })
  const themeSwitcher = getByLabelText(/switch theme/i)

  expect(getThemeHook().result.current.isDarkTheme).toBeFalsy()

  act(() => userEvent.click(themeSwitcher))
  expect(getThemeHook().result.current.isDarkTheme).toBeTruthy()

  act(() => userEvent.click(themeSwitcher))
  expect(getThemeHook().result.current.isDarkTheme).toBeFalsy()

  // TODO: language switching

  // close by clicking on the button
  act(() => userEvent.click(optionsButton))
  await waitFor(() => expect(queryOptions()).not.toBeInTheDocument())
})