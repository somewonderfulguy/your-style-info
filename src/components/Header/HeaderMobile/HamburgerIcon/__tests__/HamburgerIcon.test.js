import React from 'react'
import {render} from '@testing-library/react'

import * as mockThemeContext from 'contexts/themeContext'
import HamburgerIcon from '..'

jest.spyOn(mockThemeContext, 'useTheme').mockImplementation(() => ({isDarkTheme: false}))
afterEach(() => jest.clearAllMocks())

test('snapshot diffrenece between default and clicked states', async () => {
  const {asFragment, rerender} = render(<HamburgerIcon />)
  const defaultState = asFragment()
  rerender(<HamburgerIcon isOpen />)

  // TODO remove once react-spring 9.0.0 released
  await new Promise((r) => setTimeout(r, 400))

  const clickedState = asFragment()

  expect(defaultState).toMatchDiffSnapshot(clickedState, {
    contextLines: 10,
    aAnnotation: 'default state (three lines)',
    bAnnotation: 'clicked state (cross)'
  })
  expect(mockThemeContext.useTheme).toHaveBeenCalledTimes(2)

  // TODO close and compare
})

test('snapshot difference in dark/light theme', async () => {
  const lightTheme = render(<HamburgerIcon />).asFragment()

  mockThemeContext.useTheme.mockReturnValueOnce({isDarkTheme: true})
  const darkTheme = render(<HamburgerIcon />).asFragment()

  expect(lightTheme).toMatchDiffSnapshot(darkTheme, {
    contextLines: 1,
    aAnnotation: 'light theme',
    bAnnotation: 'dark theme'
  })

  expect(mockThemeContext.useTheme).toHaveBeenCalledTimes(2)

  // TODO switch back and compare
})