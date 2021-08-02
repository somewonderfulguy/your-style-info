import React from 'react'
import {render, waitFor} from '@testing-library/react'
import {act, renderHook} from '@testing-library/react-hooks'

import {ThemeProvider, useTheme} from 'contexts'
import HamburgerIcon from '..'

const setup = () => render(<HamburgerIcon />, {wrapper: ThemeProvider})

test('snapshot diffrenece between default and clicked states', async () => {
  const {container, rerender} = setup()
  const lines = container.querySelectorAll('div')

  const defaultStyles = [
    {top: '0px', transform: 'rotate(0deg)'},
    {background: 'rgb(0, 0, 0)'},
    {bottom: '0px', transform: 'rotate(-0deg)'}
  ]
  const clickedStyles = [
    {top: '0px', transform: 'rotate(45deg)'},
    {background: 'rgba(0, 0, 0, 0)'},
    {bottom: '0px', transform: 'rotate(-45deg)'}
  ]

  const assertDefaultStyles = () =>
    lines.forEach((line, idx) => expect(line).toHaveStyle(defaultStyles[idx]))

  assertDefaultStyles()

  rerender(<HamburgerIcon isOpen />)
  await waitFor(() => lines.forEach((line, idx) => expect(line).toHaveStyle(clickedStyles[idx])))

  rerender(<HamburgerIcon isOpen={false} />)
  await waitFor(() => assertDefaultStyles())
})

test('snapshot difference in dark/light theme', async () => {
  const {result} = renderHook(() => useTheme(), {wrapper: ThemeProvider})

  const lightTheme = setup().asFragment()
  act(() => result.current.switchTheme())
  const darkTheme = setup().asFragment()

  expect(lightTheme).toMatchDiffSnapshot(darkTheme, {
    contextLines: 1,
    aAnnotation: 'light theme',
    bAnnotation: 'dark theme'
  })

  // back to light check
  act(() => result.current.switchTheme())
  const backToLightTheme = setup().asFragment()
  expect(backToLightTheme).toEqual(lightTheme)
})