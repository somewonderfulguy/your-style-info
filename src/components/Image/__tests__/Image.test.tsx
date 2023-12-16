import React from 'react'

import {
  render,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved
} from 'shared/tests'
import Image, { getAspectRatio } from '../Image'

jest.mock('shared/hooks/useIntersectionObserver')

const CAPTION = 'A man in suit with briefcase and baguette'

const setup = (props = {}) => {
  const utils = render(
    <Image
      url="/img/trench-coat-01.jpg"
      alt={CAPTION}
      lowresBase64="base64string"
      width={1024}
      height={768}
      caption={CAPTION}
      {...props}
    />
  )
  const getPreloadBlock = () =>
    utils.container.querySelector('.preloadPlaceholder')
  return {
    getPreloadBlock,
    ...utils
  }
}

// TODO test focus on retry and zoom buttons
// TODO load whole app and test theme switching
// TODO ? try to resize to smaller screen size and check snapshot difference

test('getAspectRatio fn calculates paddingBottom value correctly', () => {
  expect(getAspectRatio(16, 9)).toEqual(56.25)
  expect(+getAspectRatio(21, 9).toFixed(2)).toEqual(42.86)
})

test('image works as expected', async () => {
  const { getPreloadBlock } = setup()

  // preload block only, image loads and appears
  expect(getPreloadBlock()).toBeInTheDocument()
  expect(screen.queryByRole('img')).not.toBeInTheDocument()

  await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument())

  // assert caption
  expect(screen.getByText(CAPTION)).toBeInTheDocument()
})

test('should not show figcaption if no caption passed as a prop', async () => {
  const { container } = setup({ caption: undefined })
  const figcaption = container.querySelector('figcaption')
  expect(figcaption).not.toBeInTheDocument()
})

test('"try again" block on failed image load works as expected', async () => {
  // on rejected loading an error of unsuccessful load is logged, so muting it
  jest.spyOn(console, 'error').mockImplementation(() => {})

  const OriginalImage = window.Image

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.Image = class {
    constructor() {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.onerror() // simulate error
      }, 100)
    }
  }

  // for some reason to make test pass, the new url has to be set
  const { getPreloadBlock } = setup({ url: '/img/trench-coat-02.jpg' })

  // preloader, no image
  expect(getPreloadBlock()).toBeInTheDocument()
  expect(screen.queryByRole('img')).not.toBeInTheDocument()

  // error message appears
  await screen.findByText(/an error occured/i)
  await screen.findByText(/try.{1,}again/i)

  // restoring mocks
  expect(console.error).toHaveBeenCalledTimes(1)
  jest.spyOn(console, 'error').mockRestore()
  window.Image = OriginalImage

  userEvent.click(screen.getByRole('button'))
  await waitForElementToBeRemoved(() => screen.getByText(/an error occured/i))
  waitFor(() => expect(screen.queryByRole('img')).toBeInTheDocument())
})
