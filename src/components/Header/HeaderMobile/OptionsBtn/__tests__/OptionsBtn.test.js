import React from 'react'
import {render} from '@testing-library/react'

import * as spyThemeContext from 'contexts/themeContext'
import OptionsBtn from '..'

jest.spyOn(spyThemeContext, 'useTheme')

beforeEach(() => spyThemeContext.useTheme.mockReturnValue({isDarkTheme: false}))
afterEach(() => jest.clearAllMocks())

test('snapshot diffrenece between default and clicked states', async () => {
  const {asFragment, rerender} = render(<OptionsBtn />)
  const defaultState = asFragment()
  rerender(<OptionsBtn isOpen />)

  // TODO remove once react-spring 9.0.0 released
  await new Promise((r) => setTimeout(r, 350))

  const clickedState = asFragment()

  expect(defaultState).toMatchDiffSnapshot(clickedState, {
    contextLines: 10,
    aAnnotation: 'default state (three dots)',
    bAnnotation: 'clicked state (cross)'
  })
  expect(spyThemeContext.useTheme).toHaveBeenCalledTimes(2)
})

test('snapshot difference in dark/light theme', () => {
  const {asFragment, rerender} = render(<OptionsBtn />)
  const lightTheme = asFragment()

  spyThemeContext.useTheme.mockReturnValueOnce({isDarkTheme: true})
  rerender(<OptionsBtn />)
  const darkTheme = asFragment()

  expect(lightTheme).toMatchDiffSnapshot(darkTheme, {
    contextLines: 0,
    aAnnotation: 'light theme',
    bAnnotation: 'dark theme'
  })

  expect(spyThemeContext.useTheme).toHaveBeenCalledTimes(2)
})