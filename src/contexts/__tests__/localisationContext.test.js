import {renderHook} from '@testing-library/react-hooks'

import {LocalisationProvider, useLocalisation, ERROR_LOCALISATION} from '..'

test('useLocalisation should throw error if used outside LocalisationProvider', () => {
  // throw error
  const {result: {error}} = renderHook(() => useLocalisation())
  expect(error).toEqual(new Error(ERROR_LOCALISATION))

  // work properly
  expect(() => {
    renderHook(() => useLocalisation(), {wrapper: LocalisationProvider})
  }).not.toThrow()
})

test.todo('check localstorage change')

test.todo('check wrong locale passed')