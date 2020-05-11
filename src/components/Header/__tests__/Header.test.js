import React from 'react'
import {render} from '@testing-library/react'

import * as mockScreenDimensionsContext from 'contexts/screenDimensionsContext'
import Header, {BOUNDARY} from '../Header'
import {isIpad as mockIsIpad} from 'shared/utils'

jest.mock('../HeaderDesktop', () => () => 'header-desktop')
jest.mock('../HeaderMobile', () => () => 'header-mobile')
jest.mock('shared/utils')

beforeEach(() => jest.spyOn(mockScreenDimensionsContext, 'useScreenDimensions'))
afterEach(() => jest.clearAllMocks())

const HEADER_DESKTOP = 'header-desktop'
const HEADER_MOBILE = 'header-mobile'

test(`should render desktop menu if screen wider than ${BOUNDARY}px and device is not iPad`, () => {
  mockScreenDimensionsContext.useScreenDimensions.mockReturnValueOnce({screenWidth: BOUNDARY + 1})
  mockIsIpad.mockReturnValueOnce(false)

  const {getByText, queryByText} = render(<Header />)

  expect(mockIsIpad).toHaveBeenCalledTimes(1)
  expect(mockScreenDimensionsContext.useScreenDimensions).toHaveBeenCalledTimes(1)

  expect(getByText(HEADER_DESKTOP)).toBeInTheDocument()
  expect(queryByText(HEADER_MOBILE)).not.toBeInTheDocument()
})

test(`should render mobile menu if device is iPad even if screen is biggger than ${BOUNDARY}px`, () => {
  mockScreenDimensionsContext.useScreenDimensions.mockReturnValueOnce({screenWidth: BOUNDARY + 1})
  mockIsIpad.mockReturnValueOnce(true)

  const {getByText, queryByText} = render(<Header />)

  expect(mockIsIpad).toHaveBeenCalledTimes(1)
  expect(mockScreenDimensionsContext.useScreenDimensions).toHaveBeenCalledTimes(1)

  expect(getByText(HEADER_MOBILE)).toBeInTheDocument()
  expect(queryByText(HEADER_DESKTOP)).not.toBeInTheDocument()
})

test(`should render mobile menu if screen width is ${BOUNDARY}px or smaller regardless of device`, () => {
  mockScreenDimensionsContext.useScreenDimensions.mockReturnValueOnce({screenWidth: BOUNDARY})

  const {getByText, queryByText} = render(<Header />)

  expect(mockScreenDimensionsContext.useScreenDimensions).toHaveBeenCalledTimes(1)

  expect(getByText(HEADER_MOBILE)).toBeInTheDocument()
  expect(queryByText(HEADER_DESKTOP)).not.toBeInTheDocument()
})