import { renderHook } from '@testing-library/react-hooks'

import {
  ScreenDimensionsProvider,
  useScreenHeight,
  useScreenWidth,
  useIsDesktop
} from '..'

test('useScreenHeight should throw error if used outside ScreenDimensionsProvider', () => {
  // throw error
  const {
    result: { error }
  } = renderHook(() => useScreenHeight())
  expect(error).toEqual(
    new Error('useScreenHeight must be used within a ScreenDimensionsProvider')
  )

  // work properly
  expect(() => {
    renderHook(() => useScreenHeight(), { wrapper: ScreenDimensionsProvider })
  }).not.toThrow()
})

test('useScreenWidth should throw error if used outside ScreenDimensionsProvider', () => {
  // throw error
  const {
    result: { error }
  } = renderHook(() => useScreenWidth())
  expect(error).toEqual(
    new Error('useScreenWidth must be used within a ScreenDimensionsProvider')
  )

  // work properly
  expect(() => {
    renderHook(() => useScreenWidth(), { wrapper: ScreenDimensionsProvider })
  }).not.toThrow()
})

test('useIsDesktop should throw error if used outside ScreenDimensionsProvider', () => {
  // throw error
  const {
    result: { error }
  } = renderHook(() => useIsDesktop())
  expect(error).toEqual(
    new Error('useIsDesktop must be used within a ScreenDimensionsProvider')
  )

  // work properly
  expect(() => {
    renderHook(() => useIsDesktop(), { wrapper: ScreenDimensionsProvider })
  }).not.toThrow()
})
