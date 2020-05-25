import React from 'react'
import {render} from '@testing-library/react'
import {act, renderHook} from '@testing-library/react-hooks'

import {ThemeProvider, useTheme} from 'contexts'
import HamburgerIcon from '..'

const setup = () => render(<HamburgerIcon />, {wrapper: ThemeProvider})

// TODO remove all awaits once react-spring 9.0.0 released
test('snapshot diffrenece between default and clicked states', async () => {
  const {asFragment, rerender} = setup()
  const defaultState = asFragment()

  rerender(<HamburgerIcon isOpen />)
  await new Promise((r) => setTimeout(r, 400))
  const clickedState = asFragment()

  expect(defaultState).toMatchDiffSnapshot(clickedState, {
    contextLines: 10,
    aAnnotation: 'default state (three lines)',
    bAnnotation: 'clicked state (cross)'
  })

  rerender(<HamburgerIcon isOpen={false} />)
  await new Promise((r) => setTimeout(r, 400))
  const unclickedState = asFragment()

  expect(unclickedState).toEqual(defaultState)
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