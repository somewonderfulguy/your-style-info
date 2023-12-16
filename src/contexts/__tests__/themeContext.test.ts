import { renderHook } from '@testing-library/react-hooks'

import { ThemeProvider, useThemeState } from '..'

// TODO: check localStorage

test('useThemeState should throw error if used outside ThemeProvider', () => {
  // throw error
  const {
    result: { error }
  } = renderHook(() => useThemeState())
  expect(error).toEqual(
    new Error('useThemeState must be used within a ThemeProvider')
  )

  // work properly
  expect(() => {
    renderHook(() => useThemeState(), { wrapper: ThemeProvider })
  }).not.toThrow()
})
