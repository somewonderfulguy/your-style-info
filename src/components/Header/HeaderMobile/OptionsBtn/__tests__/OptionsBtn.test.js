import React from 'react'
import {render} from '@testing-library/react'

import * as mockThemeContext from 'contexts/themeContext'
import OptionsBtn from '..'

jest.spyOn(mockThemeContext, 'useTheme').mockImplementation(() => ({isDarkTheme: false}))
afterEach(() => jest.clearAllMocks())

test('should match snapshot', () => {
  const {asFragment} = render(<OptionsBtn />)
  expect(asFragment()).toMatchSnapshot()
  expect(mockThemeContext.useTheme).toHaveBeenCalledTimes(1)
})