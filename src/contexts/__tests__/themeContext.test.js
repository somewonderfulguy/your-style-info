import {renderHook} from '@testing-library/react-hooks'

import {ThemeProvider, useTheme} from '..'

// TODO: check localStorage

test('useTheme should throw error if used outside ThemeProvider', () => {
  // throw error
  const {result: {error}} = renderHook(() => useTheme())
  expect(error).toEqual(new Error('useTheme must be used within a ThemeProvider'))

  // work properly
  expect(() => {
    renderHook(() => useTheme(), {wrapper: ThemeProvider})
  }).not.toThrow()
})