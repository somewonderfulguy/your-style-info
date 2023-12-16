import { renderHook } from '@testing-library/react-hooks'

import { LocalizationProvider, useLocalization } from '..'

test('useLocalisation should throw error if used outside LocalisationProvider', () => {
  // throw error
  const {
    result: { error }
  } = renderHook(() => useLocalization())
  expect(error).toEqual(
    new Error('useLocalization must be used within a LocalizationProvider')
  )

  // work properly
  expect(() => {
    renderHook(() => useLocalization(), { wrapper: LocalizationProvider })
  }).not.toThrow()
})

test.todo('check localstorage change')

test.todo('check wrong locale passed')
