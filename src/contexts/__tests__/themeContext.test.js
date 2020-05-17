import React from 'react'
import {renderHook} from '@testing-library/react-hooks'

import {ThemeProvider, useTheme, ERROR_THEME} from '..'

test('useTheme should throw error if used outside ThemeProvider', () => {
  // throw error
  const {result: {error}} = renderHook(() => useTheme())
  expect(error).toEqual(new Error(ERROR_THEME))

  // work properly
  expect(() => {
    renderHook(() => useTheme(), {
      wrapper: props => <ThemeProvider {...props} />
    })
  }).not.toThrow()
})