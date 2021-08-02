import React from 'react'

import {fireEvent, render} from 'shared/tests'
import Header, {BOUNDARY} from '../Header'
import {isIpad as mockIsIpad} from 'shared/utils'

// TODO consider not mocking these modules
jest.mock('../HeaderDesktop', () => () => 'header-desktop')
jest.mock('../HeaderMobile', () => () => 'header-mobile')
jest.mock('shared/utils')

const HEADER_DESKTOP = 'header-desktop'
const HEADER_MOBILE = 'header-mobile'

test('should display mobile header for mobiles and iPads, for bigger screens desktop header is expected', () => {
  const {getByText, queryByText} = render(<Header />)

  // smaller screen
  window.innerWidth = BOUNDARY
  fireEvent(window, new Event('resize'))

  expect(getByText(HEADER_MOBILE)).toBeInTheDocument()
  expect(queryByText(HEADER_DESKTOP)).not.toBeInTheDocument()

  // bigger screen
  window.innerWidth = BOUNDARY + 1
  fireEvent(window, new Event('resize'))

  expect(getByText(HEADER_DESKTOP)).toBeInTheDocument()
  expect(queryByText(HEADER_MOBILE)).not.toBeInTheDocument()

  // smaller screen (double check)
  window.innerWidth = 320
  fireEvent(window, new Event('resize'))

  expect(getByText(HEADER_MOBILE)).toBeInTheDocument()
  expect(queryByText(HEADER_DESKTOP)).not.toBeInTheDocument()

  // if iPad, then mobile header expected, even if screen is 4k
  mockIsIpad.mockReturnValueOnce(true)
  window.innerWidth = 3840
  fireEvent(window, new Event('resize'))

  expect(getByText(HEADER_MOBILE)).toBeInTheDocument()
  expect(queryByText(HEADER_DESKTOP)).not.toBeInTheDocument()
})