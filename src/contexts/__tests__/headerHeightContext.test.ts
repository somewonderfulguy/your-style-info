import { renderHook } from '@testing-library/react-hooks'

import {
  HeaderHeightProvider,
  useHeaderHeightState,
  useHeaderHeightDispatch
} from '..'

test('useHeaderHeightState should throw error if used outside HeaderHeightProvider', () => {
  // throw error
  const {
    result: { error }
  } = renderHook(() => useHeaderHeightState())
  expect(error).toEqual(
    new Error('useHeaderHeightState must be used within a HeaderHeightProvider')
  )

  // work properly
  expect(() => {
    renderHook(() => useHeaderHeightState(), { wrapper: HeaderHeightProvider })
  }).not.toThrow()
})

test('useHeaderHeightDispatch should throw error if used outside HeaderHeightProvider', () => {
  // throw error
  const {
    result: { error }
  } = renderHook(() => useHeaderHeightDispatch())
  expect(error).toEqual(
    new Error(
      'useHeaderHeightDispatch must be used within a HeaderHeightProvider'
    )
  )

  // work properly
  expect(() => {
    renderHook(() => useHeaderHeightDispatch(), {
      wrapper: HeaderHeightProvider
    })
  }).not.toThrow()
})
