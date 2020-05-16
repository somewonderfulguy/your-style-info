import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'

import * as mockThemeContext from 'contexts/themeContext'
import {ThemeProvider, useTheme} from 'contexts'
import DarkThemeSwitcher from '..'

jest.spyOn(mockThemeContext, 'useTheme')
afterEach(() => jest.clearAllMocks())

const setup = (darkerPalette = false, labelText = false) => render(
  <DarkThemeSwitcher darkerPalette={darkerPalette} labelText={labelText} />, {
    wrapper: props => <ThemeProvider {...props} />
  }
)

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
  const {getByRole, asFragment} = setup()
  const getHook = () => renderHook(() => useTheme(), {
    wrapper: props => <ThemeProvider {...props} />
  })
  const checkbox = getByRole('checkbox')

  // default (light)
  expect(getHook().result.current.isDarkTheme).toBeFalsy()
  expect(useTheme).toHaveBeenCalledTimes(2)

  // switch to dark
  fireEvent.click(checkbox)
  expect(getHook().result.current.isDarkTheme).toBeTruthy()
  expect(useTheme).toHaveBeenCalledTimes(4)
  const darkComponent = asFragment()

  // switch to light
  fireEvent.click(checkbox)
  expect(getHook().result.current.isDarkTheme).toBeFalsy()
  expect(useTheme).toHaveBeenCalledTimes(6)
  const lightComponent = asFragment()

  // snapshot difference
  expect(darkComponent).toMatchDiffSnapshot(lightComponent, {
    contextLines: 2,
    aAnnotation: 'dark theme on',
    bAnnotation: 'light theme on'
  })
})