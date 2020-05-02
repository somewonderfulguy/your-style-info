import React from 'react'
import {render} from '@testing-library/react'

import {ThemeProvider} from 'contexts'
import OptionsBtn from '..'

test('should match snapshot', () => {
  const {asFragment} = render(
    <ThemeProvider>
      <OptionsBtn />
    </ThemeProvider>
  )
  expect(asFragment()).toMatchSnapshot()
})