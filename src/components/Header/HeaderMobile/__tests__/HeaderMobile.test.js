import React from 'react'
import {MemoryRouter} from 'react-router-dom'
import {fireEvent, render, wait, waitForElementToBeRemoved} from '@testing-library/react'
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

test.todo('matches snapshot') // mock all subcomponents

test.todo('show/hide header on scroll works as expected')

test('submenu works as expected', async () => {
  const {getByRole, queryByRole, getByTitle} = setup()

  const navButton = getByTitle(/navigation/i)
  const getNav = () => getByRole('navigation')
  const queryNav = () => queryByRole('navigation')

  expect(queryNav()).toBeNull()

  // open navigation
  user.click(navButton)
  await wait(() => expect(getNav()).toBeInTheDocument())

  // check items quantity
  const navItems = getNav().querySelectorAll('.menuWrapper > ul > li')
  const subLists = Array.from(getNav().querySelectorAll('.menuWrapper > ul ul')).map(ul => ul.parentElement)
  const subListsLengths = subLists.map(list => list.querySelectorAll('li').length)
  const treeButtons = getNav().querySelectorAll('button')

  const expectedItems = Object.values(PRIME_ROUTES)
  const expectedExpandableItems = expectedItems.filter(val => val.sub)
  const expectedSubItemsLengths = Object.values(expectedExpandableItems)
    .map(item => Object.keys(item.sub).length)

  // TODO: test contents instead of lengths
  expect(navItems).toHaveLength(expectedItems.length)
  expect(treeButtons).toHaveLength(expectedExpandableItems.length)
  expect(subListsLengths).toEqual(expectedSubItemsLengths)

  // TODO: check disabled items qty
  // TODO: check disabled sub-items qty

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
  fireEvent.click(document)
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