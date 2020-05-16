import React from 'react'
import {renderHook} from '@testing-library/react-hooks'

import {ScreenDimensionsProvider, useScreenDimensions, ERROR_SCREEN} from '..'

test('useScreenDimensions should throw error if used outside ScreenDimensionsProvider', () => {
  // throw error
  const {result: {error}} = renderHook(() => useScreenDimensions())
  expect(error).toEqual(new Error(ERROR_SCREEN))

  // work properly
  expect(() => {
    renderHook(() => useScreenDimensions(), {
      wrapper: props => <ScreenDimensionsProvider {...props} />
    })
  }).not.toThrow()
})