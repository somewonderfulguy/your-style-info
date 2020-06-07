import React from 'react'
import {act, render, screen, wait} from '@testing-library/react'

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
  return utils
}

const mockPromise = Promise.resolve()
const mockCancel = jest.fn()
mockImgPreloadPromise.mockReturnValue([mockPromise, mockCancel])

afterEach(() => jest.clearAllMocks())

test('getAspectRatio fn calculates paddingBottom value correctly', () => {
  // TODO: replace with jest-in-case
  expect(getAspectRatio(16, 9)).toEqual(56.25)
  expect(+getAspectRatio(21, 9).toFixed(2)).toEqual(42.86)
})

test('image works as expected', async () => {
  const {container, unmount} = setup()
  const getPreloadBlock = () => container.querySelector('.preloadPlaceholder')

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

test.todo('if image load fails should show try again block')