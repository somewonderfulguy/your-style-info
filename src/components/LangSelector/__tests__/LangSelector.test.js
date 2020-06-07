import React from 'react'
import {act} from '@testing-library/react'
import user from '@testing-library/user-event'

import {renderWithRouter} from 'shared'
import * as mockThemeContext from 'contexts/themeContext'
import LangSelector from '..'

jest.spyOn(mockThemeContext, 'useTheme').mockImplementation(() => ({isDarkTheme: false}))
afterEach(() => jest.clearAllMocks())

expect.addSnapshotSerializer({
  test(val) {return true},
  print(val) {return val.replace(/\n\+\s{0,}<ul(\n.*){1,}/gm, '')}
})

const setup = (showAbove, gray, path = '/') => (
  renderWithRouter(
    <LangSelector showAbove={showAbove} gray={gray} />,
    {route: path}
  )
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
  const url = '/en/outerwear/trench-coat'
  const {getByLabelText, getByRole, queryByRole, history} = setup(false, false, url)
  const langSelectorBtn = getByLabelText(/switch language/i)

  expect(queryByRole('menu')).not.toBeInTheDocument()

  // open
  user.click(langSelectorBtn)
  expect(getByRole('menu')).toBeInTheDocument()

  // select language - changes language & closes menu
  const beforeChange = url
  const afterChange = url.replace(/^\/en/, '/ru')

  expect(history.location.pathname).toEqual(beforeChange)

  user.click(getByRole('menu').querySelector('button:not(:disabled)'))

  expect(queryByRole('menu')).not.toBeInTheDocument()
  expect(history.location.pathname).toEqual(afterChange)

  // open
  user.click(langSelectorBtn)

  // close
  user.click(langSelectorBtn)
  expect(queryByRole('menu')).not.toBeInTheDocument()

  // open
  user.click(langSelectorBtn)

  // close by clicking outside
  user.click(getByLabelText(/switch language/i))
  act(() => user.click(document.body))
  expect(queryByRole('menu')).not.toBeInTheDocument()
})