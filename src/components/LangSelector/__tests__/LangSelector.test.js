import React from 'react'
import {act, screen} from '@testing-library/react'
import user from '@testing-library/user-event'

import {renderWithRouter} from 'shared'
import * as spyThemeContext from 'contexts/themeContext'
import {LocalisationProvider} from 'contexts/localisationContext'
import LangSelector from '..'

jest.spyOn(spyThemeContext, 'useTheme').mockImplementation(() => ({isDarkTheme: false}))
jest.spyOn(window, 'fetch')

jest.mock('components/Image', () => () => 'mock-image')

afterEach(() => jest.clearAllMocks())

expect.addSnapshotSerializer({
  test(val) {return true},
  print(val) {return val.replace(/\n\+\s{0,}<ul(\n.*){1,}/gm, '')}
})

const setup = (showAbove, gray, path = '/') => {
  const utils = renderWithRouter(
    <LangSelector showAbove={showAbove} gray={gray} />,
    {wrapper: LocalisationProvider},
    {route: path}
  )

  const getSwitchLanguageBtn = () => screen.getByLabelText(/switch language/i)

  return {
    ...utils,
    getSwitchLanguageBtn
  }
}

test('snapshot diff: dropdown above/below, default/gray colour, light/dark mode', () => {
  spyThemeContext.useTheme.mockReturnValueOnce({isDarkTheme: false})
  const componentDefault = setup().asFragment()

  spyThemeContext.useTheme.mockReturnValueOnce({isDarkTheme: true})
  const componentWithProps = setup(true, true).asFragment()

  expect(spyThemeContext.useTheme).toHaveBeenCalledTimes(2)
  expect(componentDefault).toMatchDiffSnapshot(componentWithProps, {
    contextLines: 1,
    aAnnotation: 'default props and theme',
    bAnnotation: 'drop-up, gray colour, dark mode'
  })
})

test('snapshot diff: aria state and css-class of triangle when open/hidden menu (+ drop-up/down diff)', () => {
  const diffSnapshotOptions = {
    contextLines: 1,
    aAnnotation: 'collapsed menu',
    bAnnotation: 'expanded menu'
  }

  const {getSwitchLanguageBtn, asFragment, rerender} = setup()
  const beforeClick = asFragment()
  const switchLanguageBtn = getSwitchLanguageBtn()

  user.click(switchLanguageBtn)
  expect(beforeClick).toMatchDiffSnapshot(asFragment(), diffSnapshotOptions)

  user.click(switchLanguageBtn)
  rerender(<LangSelector showAbove />)

  const beforeClickShowAbove = asFragment()
  user.click(switchLanguageBtn)
  expect(beforeClickShowAbove).toMatchDiffSnapshot(asFragment(), diffSnapshotOptions)
})

test('should show/hide menu when clicking on language selector', async () => {
  const promise = Promise.resolve({
    ok: true,
    json: async () => ({header: 'mockData', components: []})
  })
  window.fetch.mockReturnValueOnce(promise)

  const url = '/en/outerwear/trench-coat'
  const {getSwitchLanguageBtn} = setup(false, false, url)
  const langSelectorBtn = getSwitchLanguageBtn()

  expect(screen.queryByRole('menu')).not.toBeInTheDocument()

  // open
  user.click(langSelectorBtn)
  expect(screen.getByRole('menu')).toBeInTheDocument()

  // select language - makes api call, hides menu
  user.click(screen.getByRole('menu').querySelector('button:not(:disabled)'))
  await act(() => promise)
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  expect(window.fetch).toHaveBeenCalledTimes(1)

  // open
  user.click(langSelectorBtn)

  // close
  user.click(langSelectorBtn)
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()

  // open
  user.click(langSelectorBtn)

  // close by clicking outside
  user.click(screen.getByLabelText(/switch language/i))
  act(() => user.click(document.body))
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()
})