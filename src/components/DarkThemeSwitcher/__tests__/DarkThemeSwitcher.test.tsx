import { renderHook } from '@testing-library/react-hooks'
import user from '@testing-library/user-event'

import { screen, render, renderWholeApp } from 'shared/tests'
import { ThemeProvider, useThemeState } from 'contexts'
import DarkThemeSwitcher from '..'

const setup = (darkerPalette = false, labelText = false) => {
  const utils = render(
    <DarkThemeSwitcher darkerPalette={darkerPalette} labelText={labelText} />
  )
  return utils
}

test('should match snapshot', () => {
  const { asFragment } = setup()
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
  renderWholeApp()

  const [themeSwitcher] = screen.getAllByLabelText(/switch theme/i)

  const getHook = () =>
    renderHook(() => useThemeState(), {
      wrapper: ThemeProvider
    })

  // default (light)
  expect(getHook().result.current).toBeFalsy()
  expect(window.localStorage.getItem('isDarkTheme')).toBe('false')

  // switch to dark
  user.click(themeSwitcher)
  expect(getHook().result.current).toBeTruthy()
  expect(window.localStorage.getItem('isDarkTheme')).toBe('true')

  // switch to light
  user.click(themeSwitcher)
  expect(getHook().result.current).toBeFalsy()
  expect(window.localStorage.getItem('isDarkTheme')).toBe('false')
})
