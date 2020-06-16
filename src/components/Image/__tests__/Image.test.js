import React from 'react'
import {act, render, screen, wait, waitForElementToBeRemoved} from '@testing-library/react'
import user from '@testing-library/user-event'

import Image, {getAspectRatio} from '../Image'
import {imgPreloadPromise as mockImgPreloadPromise} from 'shared/utils'
import {ThemeProvider} from 'contexts'

jest.mock('shared/utils/imgPreload')

const FILE_PATH = 'path/nice-briefcase.jpg'
const CAPTION = 'A man in suit with briefcase and baguette'

const setup = props => {
  const utils = render(
    <Image
      url={FILE_PATH}
      alt={CAPTION}
      lowresBase64="base64string"
      width={1024}
      height={768}
      caption={CAPTION}
      {...props}
    />,
    {wrapper: ThemeProvider}
  )
  const getPreloadBlock = () => utils.container.querySelector('.preloadPlaceholder')
  return {
    getPreloadBlock,
    ...utils
  }
}

// TODO test focus on retry and zoom buttons

const mockPromise = Promise.resolve()
const mockCancel = jest.fn()
mockImgPreloadPromise.mockReturnValue([mockPromise, mockCancel])

afterEach(() => jest.clearAllMocks())

test('getAspectRatio fn calculates paddingBottom value correctly', () => {
  // TODO: replace with jest-in-case ??
  expect(getAspectRatio(16, 9)).toEqual(56.25)
  expect(+getAspectRatio(21, 9).toFixed(2)).toEqual(42.86)
})

test('image works as expected', async () => {
  const {getPreloadBlock, unmount} = setup()

  // preload block only, image loads and appears, preload block disappears
  expect(getPreloadBlock()).toBeInTheDocument()
  expect(screen.queryByRole('img')).not.toBeInTheDocument()
  await wait(() => expect(screen.getByRole('img')).toBeInTheDocument())
  await wait(() => expect(getPreloadBlock()).not.toBeInTheDocument())

  expect(mockImgPreloadPromise).toHaveBeenCalledWith(FILE_PATH)
  expect(mockImgPreloadPromise).toHaveBeenCalledTimes(1)

  // assert caption
  expect(screen.getByText(CAPTION)).toBeInTheDocument()

  // cancel image loading on unmount
  unmount()
  expect(mockCancel).toHaveBeenCalledTimes(1)
})

test('should not show figcaption if no caption passed as a prop', async () => {
  const {container} = setup({caption: undefined})
  const figcaption = container.querySelector('figcaption')
  expect(figcaption).not.toBeInTheDocument()

  await act(() => mockPromise)
})

test('"try again" block on failed image load works as expected', async () => {
  // FIXME: give it another chance after react-spring 9.0 released
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const mockRejectPromise = Promise.reject(new Error('mock reject'))
  mockImgPreloadPromise.mockReturnValueOnce([mockRejectPromise, mockCancel])

  const {getPreloadBlock} = setup()

  // preloader, no image
  expect(getPreloadBlock()).toBeInTheDocument()
  expect(screen.queryByRole('img')).not.toBeInTheDocument()

  // error message appears
  const errorMsg = await screen.findByText(/an error occured/i)
  expect(errorMsg).toBeInTheDocument()

  // preloader placeholder is still in the document
  expect(getPreloadBlock()).toBeInTheDocument()

  // click on try again, error disappear and preload placeholder disappear, image appears
  act(() => user.click(screen.getByRole('button')))
  await waitForElementToBeRemoved(() => screen.getByText(/an error occured/i))
  await waitForElementToBeRemoved(getPreloadBlock)
  expect(screen.queryByRole('img')).toBeInTheDocument()

  await act(() => mockPromise)

  // assert mock
  expect(mockImgPreloadPromise).toHaveBeenCalledTimes(2)

  expect(console.error).toHaveBeenCalledTimes(1)
  jest.spyOn(console, 'error').mockRestore()
})