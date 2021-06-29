import {renderHook} from '@testing-library/react-hooks'

import {ScreenDimensionsProvider, useScreenDimensions} from '..'

test('useScreenDimensions should throw error if used outside ScreenDimensionsProvider', () => {
  // throw error
  const {result: {error}} = renderHook(() => useScreenDimensions())
  expect(error).toEqual(new Error('useScreenDimensions must be used within a ScreenDimensionsProvider'))

  // work properly
  expect(() => {
    renderHook(() => useScreenDimensions(), {wrapper: ScreenDimensionsProvider})
  }).not.toThrow()
})