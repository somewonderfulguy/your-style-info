import React from 'react'
import {act, render} from '@testing-library/react'
import user from '@testing-library/user-event'

import * as mockThemeContext from 'contexts/themeContext'
import LangSelector from '..'

jest.spyOn(mockThemeContext, 'useTheme').mockImplementation(() => ({isDarkTheme: false}))
afterEach(() => jest.clearAllMocks())

expect.addSnapshotSerializer({
  test(val) {return true},
  print(val) {return val.replace(/\n\+\s{0,}<ul(\n.*){1,}/gm, '')}
})

const setup = (showAbove, gray) => (
  render(<LangSelector showAbove={showAbove} gray={gray} />)
)

test('snapshot diff: dropdown above/below, default/gray colour, light/dark mode', () => {
  mockThemeContext.useTheme.mockReturnValueOnce({isDarkTheme: false})
  const componentDefault = setup().asFragment()

  mockThemeContext.useTheme.mockReturnValueOnce({isDarkTheme: true})
  const componentWithProps = setup(true, true).asFragment()

  expect(mockThemeContext.useTheme).toHaveBeenCalledTimes(2)
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

  const {getByLabelText, asFragment, rerender} = setup()
  const beforeClick = asFragment()
  const switchLanguageBtn = getByLabelText('Switch language')

  user.click(switchLanguageBtn)
  expect(beforeClick).toMatchDiffSnapshot(asFragment(), diffSnapshotOptions)

  user.click(switchLanguageBtn)
  rerender(<LangSelector showAbove />)

  const beforeClickShowAbove = asFragment()
  user.click(switchLanguageBtn)
  expect(beforeClickShowAbove).toMatchDiffSnapshot(asFragment(), diffSnapshotOptions)
})

test('should show/hide menu when clicking on language selector', () => {
  const {getByLabelText, getByRole, queryByRole} = setup()
  const langSelectorBtn = getByLabelText(/switch language/i)

  expect(queryByRole('menu')).toBeNull()

  user.click(langSelectorBtn)
  expect(getByRole('menu')).toBeInTheDocument()

  user.click(langSelectorBtn)
  expect(queryByRole('menu')).toBeNull()
})

test('should hide menu after selecting a language', () => {
  const {getByRole, queryByRole, getByLabelText} = setup()

  user.click(getByLabelText('Switch language'))
  user.click(getByRole('menu').querySelector('button:not(:disabled)'))

  expect(queryByRole('menu')).toBeNull()
})

test('should hide menu if clicked somewhere outside', () => {
  const {queryByRole, getByLabelText} = setup()

  user.click(getByLabelText('Switch language'))
  act(() => user.click(document.body))

  expect(queryByRole('menu')).toBeNull()
})