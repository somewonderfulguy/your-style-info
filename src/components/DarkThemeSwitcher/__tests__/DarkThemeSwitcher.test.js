import React from 'react'
import {screen, render} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'
import user from '@testing-library/user-event'

import * as mockThemeContext from 'contexts/themeContext'
import {ThemeProvider, useTheme} from 'contexts'
import DarkThemeSwitcher from '..'

jest.spyOn(mockThemeContext, 'useTheme')
afterEach(() => jest.clearAllMocks())

const setup = (darkerPalette = false, labelText = false) => {
  const utils = render (
    <DarkThemeSwitcher darkerPalette={darkerPalette} labelText={labelText} />, {
      wrapper: ThemeProvider
    }
  )
  return utils
}

test('should match snapshot', () => {
  const {asFragment} = setup()
  expect(asFragment()).toMatchSnapshot()
})

test('should change depending on darkerPalette prop', () => {
  const defaultProps = setup().asFragment()
  const withDarkPalette = setup(true).asFragment()

  expect(defaultProps).toMatchDiffSnapshot(withDarkPalette, {
    contextLines: 1,
    aAnnotation: 'dark palette off',
    bAnnotation: 'dark palette on'
  })
})

test('should change depending on labelText prop', () => {
  const defaultProps = setup().asFragment()
  const withLabelText = setup(false, true).asFragment()

  expect(defaultProps).toMatchDiffSnapshot(withLabelText, {
    contextLines: 1,
    aAnnotation: 'label text off',
    bAnnotation: 'label text on'
  })
})

test('switching theme should work properly', async () => {
  const {asFragment} = setup()
  const getHook = () => renderHook(() => useTheme(), {
    wrapper: ThemeProvider
  })
  const checkbox = screen.getByRole('checkbox')

  // default (light)
  expect(getHook().result.current.isDarkTheme).toBeFalsy()
  expect(window.localStorage.getItem('isDarkTheme')).toEqual('false')

  // switch to dark
  user.click(checkbox)
  expect(getHook().result.current.isDarkTheme).toBeTruthy()
  expect(window.localStorage.getItem('isDarkTheme')).toEqual('true')
  const darkComponent = asFragment()

  // switch to light
  user.click(checkbox)
  expect(getHook().result.current.isDarkTheme).toBeFalsy()
  expect(window.localStorage.getItem('isDarkTheme')).toEqual('false')
  const lightComponent = asFragment()

  // snapshot difference
  expect(darkComponent).toMatchDiffSnapshot(lightComponent, {
    contextLines: 2,
    aAnnotation: 'dark theme on',
    bAnnotation: 'light theme on'
  })
})