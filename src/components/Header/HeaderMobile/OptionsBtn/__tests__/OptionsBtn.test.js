import React from 'react'
import {render} from '@testing-library/react'

import * as mockThemeContext from 'contexts/themeContext'
import OptionsBtn from '..'

jest.spyOn(mockThemeContext, 'useTheme').mockImplementation(() => ({isDarkTheme: false}))
afterEach(() => jest.clearAllMocks())

test('snap diff', async () => {
  const {asFragment, rerender} = render(<OptionsBtn />)
  const closedState = asFragment()
  rerender(<OptionsBtn isOpen />)

  // TODO remove once react-spring 9.0.0 released
  await new Promise((r) => setTimeout(r, 350))

  const openState = asFragment()

  expect(closedState).toMatchDiffSnapshot(openState, {
    contextLines: 10,
    aAnnotation: 'closed state (three dots)',
    bAnnotation: 'open state (cross)'
  })
  expect(mockThemeContext.useTheme).toHaveBeenCalledTimes(2)
})