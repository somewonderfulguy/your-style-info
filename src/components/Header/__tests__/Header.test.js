import React from 'react'
import {render} from '@testing-library/react'

import {ScreenWidthContext} from 'ApplicationNode'
import {ThemeProvider} from 'helpers/contexts'
import Header, {BOUNDARY} from '../Header'
import {isIpad as mockIsIpad} from 'utils'

jest.mock('../HeaderDesktop', () => () => 'header-desktop')
jest.mock('../HeaderMobile', () => () => 'header-mobile')
jest.mock('utils')

afterEach(() => jest.clearAllMocks())

const HEADER_DESKTOP = 'header-desktop'
const HEADER_MOBILE = 'header-mobile'

const renderHeader = value => render(
  <ThemeProvider>
    <ScreenWidthContext.Provider value={value}>
      <Header />
    </ScreenWidthContext.Provider>
  </ThemeProvider>
)

test(`should render desktop menu if screen wider than ${BOUNDARY}px and device is not iPad`, () => {
  mockIsIpad.mockReturnValueOnce(false)
  const {getByText, queryByText} = renderHeader(BOUNDARY + 1)

  expect(mockIsIpad).toHaveBeenCalledTimes(1)
  expect(getByText(HEADER_DESKTOP)).toBeInTheDocument()
  expect(queryByText(HEADER_MOBILE)).not.toBeInTheDocument()
})

test(`should render mobile menu if device is iPad even if screen is biggger than ${BOUNDARY}px`, () => {
  mockIsIpad.mockReturnValueOnce(true)
  const {getByText, queryByText} = renderHeader(BOUNDARY + 1)

  expect(mockIsIpad).toHaveBeenCalledTimes(1)
  expect(getByText(HEADER_MOBILE)).toBeInTheDocument()
  expect(queryByText(HEADER_DESKTOP)).not.toBeInTheDocument()
})

test(`should render mobile menu if screen width is ${BOUNDARY}px or smaller regardless of device`, () => {
  const {getByText, queryByText} = renderHeader(BOUNDARY)

  expect(getByText(HEADER_MOBILE)).toBeInTheDocument()
  expect(queryByText(HEADER_DESKTOP)).not.toBeInTheDocument()
})