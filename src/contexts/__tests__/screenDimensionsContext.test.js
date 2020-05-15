import React from 'react'
import {render} from '@testing-library/react'
import {renderHook} from '@testing-library/react-hooks'

import {ScreenDimensionsProvider, useScreenDimensions, ERROR_SCREEN} from '..'

const UseScreenDimensionsComponent = () => {
  useScreenDimensions()
  return <div />
}

test('useScreenDimensions should throw error if used outside ScreenDimensionsProvider', () => {
  // error
  const {result: {error}} = renderHook(() => useScreenDimensions())
  expect(error).toEqual(new Error(ERROR_SCREEN))

  // correct
  expect(() => {
    render(
      <ScreenDimensionsProvider>
        <UseScreenDimensionsComponent />
      </ScreenDimensionsProvider>
    )
  }).not.toThrow()
})