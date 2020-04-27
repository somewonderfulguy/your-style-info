import React from 'react'
import {render} from '@testing-library/react'

// TODO move contexts setup to global if possible
import {ThemeProvider} from 'helpers/contexts'
import OptionsBtn from '..'

test('should match snapshot', () => {
  const {asFragment} = render(
    <ThemeProvider>
      <OptionsBtn />
    </ThemeProvider>
  )
  expect(asFragment()).toMatchSnapshot()
})