import React from 'react'
import {render, waitFor} from '@testing-library/react'

import * as spyThemeContext from 'contexts/themeContext'
import OptionsBtn from '..'

jest.spyOn(spyThemeContext, 'useTheme')

beforeEach(() => spyThemeContext.useTheme.mockReturnValue({isDarkTheme: false}))
afterEach(() => jest.clearAllMocks())

test('snapshot diffrenece between default and clicked states', async () => {
  const {container, rerender} = render(<OptionsBtn />)
  const dots = container.querySelectorAll('.dot')

  const defaultStyles = [
    {top: '0px', width: '4px', height: '4px', borderRadius: '50%'},
    {width: '4px', height: '4px', opacity: '1'},
    {bottom: '0px', width: '4px', height: '4px', borderRadius: '50%'}
  ]
  const clickedStyles = [
    {top: '-1px', width: '24px', height: '2px'},
    {width: '4px', height: '4px', opacity: '0'},
    {bottom: '-1px', width: '24px', height: '2px'}
  ]

  // default state asserts
  dots.forEach((dot, idx) => expect(dot).toHaveStyle(defaultStyles[idx]))

  rerender(<OptionsBtn isOpen />)

  // clicked state asserts
  await waitFor(() => dots.forEach((dot, idx) => expect(dot).toHaveStyle(clickedStyles[idx])))

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