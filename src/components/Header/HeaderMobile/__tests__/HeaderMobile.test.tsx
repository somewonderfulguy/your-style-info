import React from 'react'
import {renderHook} from '@testing-library/react-hooks'

import {act, fireEvent, render, screen, userEvent, waitFor, waitForElementToBeRemoved} from 'shared/tests'
import HeaderMobile from '..'
import {ThemeProvider, useThemeState} from 'contexts'
import {PRIME_ROUTES} from 'constants/index'

test('menu (navigation) works as expected', async () => {
  render(<HeaderMobile />)

  const navButton = screen.getByTitle(/navigation/i)
  const getNav = () => screen.getByRole('navigation')
  const queryNav = () => screen.queryByRole('navigation')

  expect(queryNav()).not.toBeInTheDocument()

  // open navigation
  userEvent.click(navButton)
  await waitFor(() => expect(getNav()).toBeInTheDocument())

  // navigation items and subitems
  const subLists = Array.from(getNav().querySelectorAll('.menuWrapper > ul ul')).map(ul => ul.parentElement)
  const treeButtons = getNav().querySelectorAll('button')

  const expectedExpandableItems = Object.values(PRIME_ROUTES).filter(val => val.sub)

  const expectedItems: string[] = []
  const findItems = (arr = Object.values(PRIME_ROUTES)) => arr.forEach(route => {
    route.name && expectedItems.push(route.name)
    route.sub && findItems(Object.values(route.sub))
  })
  findItems()

  const expectedDisabled: string[] = []
  const findDisabled = (arr = Object.values(PRIME_ROUTES)) => arr.forEach(route => {
    route.inactive && expectedDisabled.push(route.name)
    route.sub && findDisabled(Object.values(route.sub))
  })
  findDisabled()

  expectedItems.forEach(text => {
    expect(screen.getByText(text)).toBeInTheDocument()
  })

  expectedDisabled.forEach(text => {
    expect(screen.getByText(text)).toHaveAttribute('aria-disabled', 'true')
  })

  expect(treeButtons).toHaveLength(expectedExpandableItems.length)

  // social media icons
  const socialMedia = [/instagram/i, /facebook/i, /twitter/i, /vkontakte/i, /youtube/i]
  socialMedia.forEach(icon => expect(screen.getByTitle(icon)).toBeInTheDocument())

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
  render(<HeaderMobile />)

  const optionsButton = screen.getByTitle(/options/i)
  const getOptions = () => screen.getByRole('menu')
  const queryOptions = () => screen.queryByRole('menu')

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
  const getThemeHook = () => renderHook(() => useThemeState(), {
    wrapper: ThemeProvider
  })

  // two themeSwitchers in the documents because of animation (I guess) - selecting one
  const [themeSwitcher] = screen.getAllByLabelText(/switch theme/i)

  expect(getThemeHook().result.current).toBeFalsy()

  act(() => userEvent.click(themeSwitcher))
  expect(getThemeHook().result.current).toBeTruthy()

  act(() => userEvent.click(themeSwitcher))
  expect(getThemeHook().result.current).toBeFalsy()

  // TODO: language switching

  // close by clicking on the button
  act(() => userEvent.click(optionsButton))
  await waitFor(() => expect(queryOptions()).not.toBeInTheDocument())
})