import {act, renderHook} from '@testing-library/react-hooks'

import {HeaderHeightProvider, useHeaderHeight, ERROR_HEADER_HEIGHT} from '..'

test('useHeaderHeight should throw error if used outside HeaderHeightProvider', () => {
  // throw error
  const {result: {error}} = renderHook(() => useHeaderHeight())
  expect(error).toEqual(new Error(ERROR_HEADER_HEIGHT))

  // work properly
  expect(() => {
    renderHook(() => useHeaderHeight(), {wrapper: HeaderHeightProvider})
  }).not.toThrow()
})

test('HeaderHeight context works as expected', () => {
  const {result} = renderHook(() => useHeaderHeight(), {wrapper: HeaderHeightProvider})
  act(() => result.current.setHeaderHeight(100))
  expect(result.current.headerHeight).toEqual(100)
})