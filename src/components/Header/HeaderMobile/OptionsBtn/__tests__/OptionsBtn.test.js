import React from 'react'
import {render} from '@testing-library/react'

// TODO move contexts setup to global if possible
import {ThemeProvider} from 'helpers/contexts'
import OptionsBtn from '..'

// TODO move to global
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

test('should match snapshot', () => {
  const {asFragment} = render(
    <ThemeProvider>
      <OptionsBtn />
    </ThemeProvider>
  )
  expect(asFragment()).toMatchSnapshot()
})