import {act, renderHook} from '@testing-library/react-hooks'

import {LoadingProvider, useLoading} from '..'

test('useLoading should throw error if used outside LoadingProvider', () => {
  // throw error
  const {result: {error}} = renderHook(() => useLoading())
  expect(error).toEqual(new Error('useLoading must be used within a LoadingProvider'))

  // work properly
  expect(() => {
    renderHook(() => useLoading(), {wrapper: LoadingProvider})
  }).not.toThrow()
})

test('LoadingContext works as expected', () => {
  const {result} = renderHook(() => useLoading(), {wrapper: LoadingProvider})

  expect(result.current.isLoading).toBeFalsy()

  act(() => result.current.setLoading(true))
  expect(result.current.isLoading).toBeTruthy()

  act(() => result.current.setLoading(false))
  expect(result.current.isLoading).toBeFalsy()
})