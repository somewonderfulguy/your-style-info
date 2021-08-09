import React from 'react'

import {act, fireEvent, render, renderWholeApp, userEvent, screen, waitFor} from 'shared/tests'
import LangSelector from '..'
import {FULL_LOCALES} from 'constants/index'

expect.addSnapshotSerializer({
  test(val) {return true},
  print(val) {return (val as string).replace(/\n\+\s{0,}<ul(\n.*){1,}/gm, '')}
})

const [english, russian] = FULL_LOCALES
const englishRegExp = new RegExp(english, 'i')
const russianRegExp = new RegExp(russian, 'i')

const setup = (showAbove?: boolean, gray?: boolean, path = '/') => {
  const utils = render(
    <LangSelector showAbove={showAbove} gray={gray} />,
    {route: path}
  )

  const getSwitchLanguageBtn = () => screen.getByTestId('langSelector')

  return {
    ...utils,
    getSwitchLanguageBtn
  }
}

test('snapshot diff: aria state and css-class of triangle when open/hidden menu (+ drop-up/down diff)', async () => {
  const diffSnapshotOptions = {
    contextLines: 1,
    aAnnotation: 'collapsed menu',
    bAnnotation: 'expanded menu'
  }

  const {getSwitchLanguageBtn, asFragment, rerender} = setup()
  const beforeClick = asFragment()
  const switchLanguageBtn = getSwitchLanguageBtn()

  const btn = screen.getByRole('button', {
    name: /switch language/i
  })

  await waitFor(() => expect(btn).not.toBeDisabled())

  userEvent.click(btn)
  expect(beforeClick).toMatchDiffSnapshot(asFragment(), diffSnapshotOptions)

  userEvent.click(switchLanguageBtn)
  rerender(<LangSelector showAbove />)

  const beforeClickShowAbove = asFragment()
  userEvent.click(switchLanguageBtn)
  expect(beforeClickShowAbove).toMatchDiffSnapshot(asFragment(), diffSnapshotOptions)
})

test('should show/hide menu when clicking on language selector', async () => {
  const url = '/en/outerwear/trench-coat'
  const {getSwitchLanguageBtn} = setup(false, false, url)
  const langSelectorBtn = getSwitchLanguageBtn()

  expect(screen.queryByRole('menu')).not.toBeInTheDocument()

  // open
  await waitFor(() => expect(langSelectorBtn).not.toBeDisabled())
  userEvent.click(langSelectorBtn)
  expect(screen.getByRole('menu')).toBeInTheDocument()

  // select language - hides menu (also check that button text changes depending on current lang, and current lang in menu must be disabled)
  const getEnglishMenuItem = () => screen.getByRole('menuitem', {name: englishRegExp}).querySelector('button')
  const getRussianMenuItem = () => screen.getByRole('menuitem', {name: russianRegExp}).querySelector('button')

  expect(langSelectorBtn).toHaveTextContent(new RegExp(english, 'i'))
  expect(getEnglishMenuItem()).toBeDisabled()
  expect(getRussianMenuItem()).not.toBeDisabled()
  userEvent.click(screen.getByRole('menu').querySelector('button:not(:disabled)') as HTMLElement)
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  await waitFor(() => expect(langSelectorBtn).toHaveTextContent(russianRegExp))

  // open
  await waitFor(() => expect(langSelectorBtn).not.toBeDisabled())
  userEvent.click(langSelectorBtn)
  expect(getEnglishMenuItem()).not.toBeDisabled()
  expect(getRussianMenuItem()).toBeDisabled()

  // close
  userEvent.click(langSelectorBtn)
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()

  // close by clicking outside
  userEvent.click(langSelectorBtn)
  act(() => userEvent.click(document.body))
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()
})

// eslint-disable-next-line jest/expect-expect
test('header and footer lang selectors, light/dark themes, desktop/mobile', async () => {
  renderWholeApp()

  const diffSnapshotOptions = {
    contextLines: 1,
    aAnnotation: 'light theme',
    bAnnotation: 'dark theme'
  }

  const [blockHeaderLangSelector, blockFooterLangSelector] = screen.getAllByText(russianRegExp)
  const headerLangSelector = blockHeaderLangSelector.closest('button')
  const footerLangSelector = blockFooterLangSelector.closest('button')
  const headerLangSelectorWrapper = headerLangSelector?.parentElement
  const footerLangSelectorWrapper = footerLangSelector?.parentElement
  const getMenu = () => screen.getByRole('menu')

  // theme switcher from footer as it always visible
  const [, themeSwitcher] = screen.getAllByLabelText(/switch theme/i)

  userEvent.click(headerLangSelector as HTMLButtonElement)
  expect(getMenu().className).toMatchSnapshot('desktop header drop down')

  userEvent.click(footerLangSelector as HTMLButtonElement)
  expect(getMenu().className).toMatchSnapshot('desktop footer drop up')

  // desktop header theme
  const desktopHeaderLight = headerLangSelectorWrapper?.className
  userEvent.click(themeSwitcher)
  const desktopHeaderDark = headerLangSelectorWrapper?.className
  expect(desktopHeaderLight).toMatchDiffSnapshot(desktopHeaderDark, diffSnapshotOptions)

  // desktop footer theme
  const desktopFooterDark = footerLangSelectorWrapper?.className
  userEvent.click(themeSwitcher)
  const desktopFooterLight = footerLangSelectorWrapper?.className
  expect(desktopFooterLight).toMatchDiffSnapshot(desktopFooterDark, diffSnapshotOptions)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.innerWidth = 320
  fireEvent(window, new Event('resize'))

  // note: mobile header is in another component - Options
  expect(headerLangSelector).not.toBeInTheDocument()

  userEvent.click(footerLangSelector as HTMLButtonElement)
  expect(getMenu().className).toMatchSnapshot('mobile footer drop up')

  // mobile footer theme
  const mobileFooterLight = footerLangSelectorWrapper?.className
  userEvent.click(themeSwitcher)
  const mobileFooterDark = footerLangSelectorWrapper?.className

  expect(mobileFooterLight).toMatchDiffSnapshot(mobileFooterDark, diffSnapshotOptions)
})