import React from 'react'
import {render, fireEvent} from '@testing-library/react'

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

// TODO update prop! and combine two test in one
test('snapshot diff: aria state and css-class of triangle when open/hidden menu', () => {
  const { getByLabelText, asFragment } = setup()
  const beforeClick = asFragment()
  fireEvent.click(getByLabelText('Switch language'))

  expect(beforeClick).toMatchDiffSnapshot(asFragment(), {
    contextLines: 1,
    aAnnotation: 'collapsed menu',
    bAnnotation: 'expanded menu'
  })
})

test('snapshot diff: css-class of triangle when open/hide menu, preset: showing menu above the language selector (drop-up)', () => {
  const { getByLabelText, asFragment } = setup(true)
  const beforeClick = asFragment()
  fireEvent.click(getByLabelText('Switch language'))

  expect(beforeClick).toMatchDiffSnapshot(asFragment(), {
    contextLines: 1,
    aAnnotation: 'collapsed menu',
    bAnnotation: 'expanded menu'
  })
})

test('should show/hide menu when clicking on language selector', () => {
  const { getByLabelText, getByRole, queryByRole } = setup()
  const langSelectorBtn = getByLabelText('Switch language')

  expect(queryByRole('list')).toBeNull()

  fireEvent.click(langSelectorBtn)
  expect(getByRole('list')).toBeInTheDocument()

  fireEvent.click(langSelectorBtn)
  expect(queryByRole('list')).toBeNull()
})

test('should hide menu after selecting a language', () => {
  const { getByRole, queryByRole, getByLabelText } = setup()

  fireEvent.click(getByLabelText('Switch language'))
  fireEvent.click(getByRole('list').querySelector('button:not(:disabled)'))

  expect(queryByRole('list')).toBeNull()
})

test('should hide menu if clicked somewhere outside', () => {
  const { queryByRole, getByLabelText } = setup()

  fireEvent.click(getByLabelText('Switch language'))
  fireEvent.click(document)

  expect(queryByRole('list')).toBeNull()
})